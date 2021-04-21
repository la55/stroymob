import styles from './Products.module.scss'
import ProductItem from './ProductItem'

const Products = ({products}) => {
    return (
        <div className={styles.grid}>
            { products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Products