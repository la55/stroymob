import Link from 'next/link'
import ProductDetail from '../../../components/products/ProductDetail'

const ProductDetailPage = ({ product }) => {
    return (
        <>
            <Link href={`/catalog/${product.catId}`} >
           <a> &larr; {product.cat.title}</a>
            </Link>
            <ProductDetail product={product} />
        </>
    )
}

export default ProductDetailPage

export const getServerSideProps = async ({params}) => {

    const prod_res = await fetch(`${process.env.INNER_DATA_API}/api1/product_with_stocks_and_params/${params.slug}`)
    const product = await prod_res.json()

    return {
        props: {
            product
        }
    }
}