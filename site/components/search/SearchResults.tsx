import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductsList from '../products/ProductList'

const SearchResults = ({ term }) => {
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        const searchProducts = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            console.log(host)
            const res =  await fetch(
                `${host}/api1/products/?page=${page}&on_page=20&title=${term}&vendor_code=${term}&barcode=${term}`
            )
            const { products, max_pages } = await res.json()
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
            { results.length > 0 ?
                <>
                    <InfiniteScroll
                        dataLength={results.length}
                        next={nextPage}
                        hasMore={(maxPages > page)}
                        loader={<h4>Loading...</h4>}
                    >
                        <ProductsList products={results} />
                    </InfiniteScroll>
                </> :
                <h2>Ничего не найдено</h2>
            }
        </div>
    )
}

export default SearchResults