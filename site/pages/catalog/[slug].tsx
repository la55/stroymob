import Link from 'next/link'
import { useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CatList from '../../components/category/CatList'
import ProductList from '../../components/products/ProductList'
import CatPath from '../../components/breadcrumbs/cat'
import Filters from '../../components/products/Filters'

const ON_PAGE = 30 

const Cat = ({ cat, cats, prod_data }) => {
    const [results, setResults] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [maxPages, setMaxPages] = useState(1)
    const [filters, setFilters] = useState([])


    useEffect(() => {
        if (cats.length > 0) {
            setResults([])
            setPageNum(1)
            return undefined
        }
        const searchProducts = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            const url = `${host}/api1/products?page=${pageNum}&on_page=${ON_PAGE}&cat_uid=${cat.uid}`
            let res
            if (filters.length > 0) {
                res = await fetch(url, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({filters: filters}),
            })
            } else {
                res = await fetch(url)
            }
            const { products, max_pages } = await res.json()
            setResults([...results, ...products])
            setMaxPages(max_pages)
        }
        searchProducts()
    }, [pageNum, cats, filters])

    const nextPage = () => {
        if (pageNum < maxPages) {
            setPageNum(pageNum + 1)
        }
    }
    return (
        <>
            { cat.breadcrumbs.length > 0 ?
                <CatPath breadcrumbs={cat.breadcrumbs} /> :
                <Link href={'/catalog/'} >
                    <a> &larr; Каталог</a>
                 </Link>
            }
            <h1>
                { cat.title}
            </h1>
            <CatList cats={cats} />
            <Filters
                filters={filters}
                setFilters={setFilters}
                setResults={setResults}
                setPageNum={setPageNum}/>
            <InfiniteScroll
                dataLength={results.length}
                next={nextPage}
                hasMore={(maxPages > pageNum)}
                loader={<div onClick={nextPage}>ПОКАЗАТЬ ЕЩЕ ...</div>}
            >
                <ProductList products={results} />
            </InfiniteScroll>
        </>
    )
}

export default Cat

export const getServerSideProps = async ({params}) => {


    const res = await fetch(`${process.env.INNER_DATA_API}/api1/cats/${params.slug}`)
    const { cat, cats } = await res.json()
    let prod_data = { products: [] }
    if (cats.length === 0) {


        const prod_res = await fetch(`${process.env.INNER_DATA_API}/api1/products/?on_page=${ON_PAGE}&cat_uid=${params.slug}`)
        prod_data = await prod_res.json()
    }

    return {
        props: {
            cat,
            cats,
            prod_data: prod_data
        }
    }
}