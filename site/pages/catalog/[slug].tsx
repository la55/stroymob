import Link from 'next/link'
import { useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CatList from '../../components/category/CatList'
import ProductList from '../../components/products/ProductList'
import CatPath from '../../components/breadcrumbs/cat'

const ON_PAGE = 30 

const Cat = ({ cat, cats, prod_data }) => {
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        if (cats.length > 0) {
            setResults([])
            return undefined
        }
        const searchProducts = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            const res = await fetch(`${host}/api1/products/?page=${page}&on_page=${ON_PAGE}&cat_uid=${cat.uid}`)
            const { products, max_pages } = await res.json()
            setResults([...results, ...products])
            setMaxPages(max_pages)
        }
        if (typeof window !== undefined) {
            searchProducts()
        } else {
            //setResults(prod_data.products)
            // add Pager ???
        }
    }, [page, cats])

    const nextPage = () => {
        if (page < maxPages) {
            setPage(page + 1)
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
            <InfiniteScroll
                dataLength={results.length}
                next={nextPage}
                hasMore={(maxPages > page)}
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