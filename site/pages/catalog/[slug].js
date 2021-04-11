import Link from 'next/link'
import CatList from '../../components/category/CatList'
import ProductList from '../../components/products/ProductList'

const Cat = ({ cat, products }) => {
    return (
        <>
            <Link href={`/catalog/${cat.catId !== 'top' ? cat.catId : ''}`} >
               &larr; назад 
            </Link>
            <h1>
                { cat.title}
            </h1>
            <CatList cats={cat.cats} />
            <ProductList products={products} />
        </>
    )
}

export default Cat

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`${process.env.INNER_DATA_API}/api1/cats/${params.slug}`)
    const cat = await res.json()
    let products = []
    if (cat.cats.length === 0) {
        const prod_res = await fetch(`${process.env.INNER_DATA_API}/api1/stock_products_by_cat/${params.slug}`)
        products = await prod_res.json()
    }

    return {
        props: {
            cat,
            products
        }
    }
}