import { useState } from 'react'
import Link from 'next/link'
import styles from './ProductItem.module.scss'

const ProductItem = ({ product }) => {
    const [image, setImage] = useState(`https://stroitel55.com/media/productphoto/${product.id}.jpg`)

    return (
        <Link key={ product.id } href={`/catalog/products/${product.id}`}>
            <div  className={styles.card}>
                <div className={styles.image}>
                <img
                    src={image}
                    onError={() => setImage('/static/svg/loading.gif')}
                    alt={ product.title }
                    width={50}
                    height={50}
                />
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        { product.title }
                    </div>
                    <div className={styles.code}>
                        <div className={styles.vendor}>
                            Арт. { product.vendor_code }
                        </div>
                        <div className={styles.barcode}>
                            { product.barcode }
                        </div>
                    </div>
                </div>
                <div className={styles.price}>
                    {product.price} руб.
                </div>
            </div>
        </Link>
    )
}


export default ProductItem