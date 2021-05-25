import Link from 'next/link'
import ProductDetail from '../../../components/products/ProductDetail'
import CatPath from '../../../components/breadcrumbs/cat'

const ProductDetailPage = ({ product, cat }) => {
    const breadcrumbs = [...cat.breadcrumbs, { title: cat.title, uid: cat.uid }]
    return (
        <>
            <CatPath breadcrumbs={breadcrumbs} />
            <ProductDetail product={product} />
        </>
    )
}

export default ProductDetailPage

export const getServerSideProps = async ({params}) => {

    const prod_res = await fetch(`${process.env.INNER_DATA_API}/api1/products/${params.slug}`)
    const { product, cat } = await prod_res.json()

    return {
        props: {
            product,
            cat
        }
    }
}