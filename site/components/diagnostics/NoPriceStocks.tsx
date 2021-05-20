import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductsList from '../products/ProductList'

const ON_PAGE = 30

const SearchResults = () => {
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        const searchProducts = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            let res =  await fetch(`${host}/api1/products/?page=${page}&on_page=${ON_PAGE}&price_gt=-1&price_lt=0.0001`)
            const data = await res.json()
            const { products, max_pages } = data
            setResults([...results, ...products])
            setMaxPages(max_pages)
        }
        searchProducts()
    }, [page])

    const nextPage = () => {
        if (page < maxPages) {
            setPage(page + 1)
        }
    }

    return (
        <div>
            <h1>В наличии на складе. Без цены !</h1>
            <InfiniteScroll
                dataLength={results.length}
                next={nextPage}
                hasMore={(maxPages > page)}
                loader={<div onClick={nextPage}>ПОКАЗАТЬ ЕЩЕ ...</div>}
            >
                <ProductsList products={results} />
            </InfiniteScroll>
        </div>
    )
}

export default SearchResults