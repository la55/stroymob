import { useState, useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'
import styles from './Item.module.scss'

const SingleItem = ({product, qty}) => {
    const [image, setImage] = useState(`https://stroitel55.com/media/productphoto/${product.uid}.jpg`)
    const { addItem, changeItemQty, removeItem, clearItems } = useContext(CartContext)

    return (
            <div className={styles.grid}>
                
                <div className={styles.card}>
                    <span className={styles.delete}
                        onClick={(e) => clearItems(product.uid)}
                    >X</span>
                    <div className={styles.image}>
                        <img
                            src={image}
                            onError={() => setImage('/static/svg/loading.gif')}
                            alt={ product.title }
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            { product.title }
                        </div>
                        <div className={styles.code}>
                            <div className={styles.vendor}>
                                { product.vendor_code }
                            </div>
                            <div className={styles.barcode}>
                                { product.barcode }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buy}>
                    <div className={styles.price}>
                        { parseFloat(product.price).toFixed(2) } руб.
                    </div>
                    <div className={styles.qty}>
                        <span onClick={() => removeItem(product.uid)}>&larr;</span>
                        <input type="text" value={ qty }
                        onChange={(e) => changeItemQty(product.uid, e.target.value)}/>
                        <span onClick={() => addItem({ product, qty: 1 })}>&rarr;</span>
                    </div>
                    <div className={styles.total_price}>
                        { (parseFloat(product.price) * qty).toFixed(2) } руб.
                    </div>
                </div>

            </div>
    )
}

export default SingleItem