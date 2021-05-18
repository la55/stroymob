import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {fetchProducts} from '../search/utils'
import ProductsList from '../products/ProductList'

const SearchResults = ({ term }) => {
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        const searchProducts = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            const { products, max_pages } = await fetchProducts(host, term, page, 20)
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
            <h1>По запросу "{term}"</h1>
            <InfiniteScroll
                dataLength={results.length}
                next={nextPage}
                hasMore={(maxPages > page)}
                loader={<h4>Загружаем...</h4>}
            >
                <ProductsList products={results} />
            </InfiniteScroll>
        </div>
    )
}

export default SearchResults