import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './Search.module.scss'
import CatList from '../../components/category/CatList'
import Products from './Products'

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
            if (Number.isInteger(parseInt(term[0]))) {
                return false
            }
            let data = []
            let res
            res =  await fetch(`${host}/api1/cats/?title=${term}`)
            data = await res.json()
            if (data.length < 1) {
                res =  await fetch(`${host}/api1/cats/?title=${term}&full=1`)
                data = await res.json()
            }
            setCats(data.slice(0,5))
        }
        const searchProducts = async () => {
            let results = []
            if (!Number.isInteger(parseInt(term[0]))) {
                let res =  await fetch(`${host}/api1/products/?title=${term}`)
                let { products } = await res.json()
                results = products
            }
            if (results.length < 1 && !Number.isInteger(parseInt(term[0]))) {
                let res =  await fetch(`${host}/api1/products/?title=${term}&full=1`)
                let { products } = await res.json()
                results = products
            }
            if (results.length < 1) {
                let res =  await fetch(`${host}/api1/products/?vendor_code=${term}&barcode=${term}`)
                let { products } = await res.json()
                results = products
            }
            if (results.length < 1) {
                let res =  await fetch(`${host}/api1/products/?count_gt=-1&title=${term}&full=1&vendor_code=${term}&barcode=${term}`)
                let { products } = await res.json()
                results = products
            }
            setProducts(results)
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
                placeholder="Поиск товара или категории"/>
            </div>
            <div className={styles.results}>
                {  cats.length > 0 ? <div className={styles.cats}>
                    <CatList cats={cats} />
                </div> : null } 
                {  products.length > 0 ? <div className={styles.products}>
                    <Products products={products} />
                    <div className={styles.all} onClick={() => router.push(`/search/${term}`)}>
                        ВСЕ РЕЗУЛЬТАТЫ
                    </div>
                </div> : null } 
            </div>
        </div>
    )
}

export default Search