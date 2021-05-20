import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchProducts, fetchCats } from './utils'
import CatList from '../../components/category/CatList'
import Products from './Products'
import styles from './Search.module.scss'

const MAX_CATS = 5
const MAX_PRODUCTS = 10

const Search = () => {
    const router = useRouter()
    const [term, setTerm] = useState('')
    const [products, setProducts] = useState([])
    const [cats, setCats] = useState([])

    useEffect(() => {
        if (term.length < 3) {
            setProducts([])
            setCats([])
            return undefined 
        }
        const host = process.env.NEXT_PUBLIC_DATA_API
        const searchCats = async () => {
            const cats = await fetchCats(host, term, MAX_CATS)
            setCats(cats.slice(0,5))
        }
        const searchProducts = async () => {
            const { products } = await fetchProducts(host, term, 1, MAX_PRODUCTS)
            setProducts(products)
        }
        searchCats()
        searchProducts()
    }, [term])

    return (
        <div className={styles.grid}>
            <div className={styles.search}>
                <input type="text"
                    name='search'
                    onChange={(e) => setTerm(e.target.value)}
                placeholder="Товар / артикул / категория"/>
            </div>
            <div className={styles.results}>
                {  cats.length > 0 ? <div className={styles.cats}>
                    <CatList cats={cats} />
                    <div className={styles.all} onClick={() => router.push(`/search/cats/${term}`)}>
                        ВСЕ КАТЕГОРИИ
                    </div>
                </div> : null } 
                {  products.length > 0 ? <div className={styles.products}>
                    <Products products={products} />
                    <div className={styles.all} onClick={() => router.push(`/search/${term}`)}>
                        ВСЕ ТОВАРЫ
                    </div>
                </div> : null } 
            </div>
        </div>
    )
}

export default Search