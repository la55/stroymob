import { useState } from 'react'
import Link from 'next/link'
import styles from './Product.module.scss'

const Product = ({ product }) => {
    const [image, setImage] = useState(`https://stroitel55.com/media/productphoto/${product.id}.jpg`)

    return (
        <Link key={ product.id } href={`/catalog/products/${product.id}`}>
            <div  className={styles.card}>
                <div className={styles.image}>
                <img
                    src={image}
                    onError={() => setImage('/static/svg/loading.gif')}
                    alt={ product.title }
                    width={150}
                    height={150}
                />
                </div>
                <div className={styles.info}>
                    <div className={styles.price}>
                        {product.price} руб.
                    </div>
                    <div className={styles.title}>
                        { product.title }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Product