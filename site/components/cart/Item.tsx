import { useState, useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'
import styles from './Item.module.scss'

const SingleItem = ({product, qty}) => {
    const [image, setImage] = useState(`https://stroitel55.com/media/productphoto/${product.id}.jpg`)
    const { addItem, changeItemQty, removeItem } = useContext(CartContext)

    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img
                    src={image}
                    onError={() => setImage('/static/svg/loading.gif')}
                    alt={ product.title }
                />
            </div>
            <div className={styles.info}>
                <div className={styles.pay}>
                    <div className={styles.qty}>
                        <span onClick={() => removeItem(product.id)}>&larr;</span>
                        <input type="text" value={ qty }
                        onChange={(e) => changeItemQty(product.id, e.target.value)}/>
                        <span onClick={() => addItem({ product, qty: 1 })}>&rarr;</span>
                    </div>
                    <div className={styles.price}>
                        { (parseFloat(product.price) * qty).toFixed(2) } руб.
                    </div>
                </div>
                <div className={styles.title}>
                    { product.title }
                </div>
            </div>
        </div>
    )
}

export default SingleItem