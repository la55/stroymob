import styles from './ProductList.module.scss'
import Product from './Product'

const ProductList = ({ products }) => (
    <div className={styles.grid}>
        { products.map(product => (
            <Product product={product} key={product.id} />
        ))}
    </div>
)

export default ProductList