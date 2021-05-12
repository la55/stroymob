import Link from 'next/link'
import CatList from '../../components/category/CatList'
import ProductList from '../../components/products/ProductList'

const Cat = ({ cat, cats, products }) => {
    return (
        <>
            <Link href={`/catalog/${cat.parent_uid !== 'top' ? cat.parent_uid : ''}`} >
               &larr; назад 
            </Link>
            <h1>
                { cat.title}
            </h1>
            <CatList cats={cats} />
            <ProductList products={products} />
        </>
    )
}

export default Cat

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`${process.env.INNER_DATA_API}/api1/cats/${params.slug}`)
    const { cat, cats } = await res.json()
    let products = []
    if (cats.length === 0) {
        const prod_res = await fetch(`${process.env.INNER_DATA_API}/api1/catalog/${params.slug}`)
        products = await prod_res.json()
    }

    return {
        props: {
            cat,
            cats,
            products
        }
    }
}