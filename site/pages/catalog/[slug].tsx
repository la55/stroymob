import Link from 'next/link'
import { useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CatList from '../../components/category/CatList'
import ProductList from '../../components/products/ProductList'
import CatPath from '../../components/breadcrumbs/cat'
import Filters from '../../components/products/Filters'

const ON_PAGE = 30 

const Cat = ({ cat, cats, cat_params, prod_data }) => {
    const [results, setResults] = useState([])
    const [resCount, setResCount] = useState(prod_data.count)
    const [pageNum, setPageNum] = useState(1)
    const [maxPages, setMaxPages] = useState(1)
    const [filters, setFilters] = useState([])
    const [showFilters, setShowFilters] = useState(false)


    useEffect(() => {
        if (cats.length > 0) {
            setResults([])
            setPageNum(1)
            setFilters([])
        }
    },[cats])

    useEffect(() => {
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
            const { products, max_pages, count } = await res.json()
            setResults([...results, ...products])
            setResCount(count)
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
            {cats.length === 0 && 
                <div>
                    <div>
                        <div onClick={() => setShowFilters(true)}>
                            ФИЛЬТР ({filters.length})
                        </div>
                        <div>
                            ВСЕГО: { resCount }
                        </div>
                    </div>
                    <Filters
                    catParams={cat_params.params}
                    realFilters={filters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    setRealFilters={setFilters}
                    setResults={setResults}
                    setPageNum={setPageNum}/>
                </div>
            }
            <InfiniteScroll
                dataLength={results.length}
                next={nextPage}
                hasMore={(maxPages > pageNum)}
                loader={<div onClick={nextPage}>{results.length > 0 && <b>ПОКАЗАТЬ ЕЩЕ ...</b>}</div>}
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
    let cat_params = []
    if (cats.length === 0) {


        const prod_res = await fetch(`${process.env.INNER_DATA_API}/api1/products/?on_page=${ON_PAGE}&cat_uid=${params.slug}`)
        prod_data = await prod_res.json()
        const filter_res = await fetch(`${process.env.INNER_DATA_API}/api1/filters/${params.slug}`)
        cat_params = await filter_res.json()
    }

    return {
        props: {
            cat,
            cats,
            prod_data,
            cat_params
        }
    }
}