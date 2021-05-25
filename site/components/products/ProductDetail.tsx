import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '../../context/cart/cart.provider'
import styles from './ProductDetail.module.scss'
import Params from './Params'
import Stocks from './Stocks'
import ProductList from './ProductList'

const ProductDetail = ({ product }) => {

    const router = useRouter()
    const [image, setImage] = useState(`https://stroitel55.com/media/productphoto/${product.uid}.jpg`)
    const [itemInCart, setItemInCart] = useState(false)
    const { addItem, cartItems } = useContext(CartContext)


    useEffect(() => {
        const found = cartItems.find(cartItem => cartItem.product.uid === product.uid)
        if (found) {
            setItemInCart(true)
        } else {
            setItemInCart(false)
        }
    },[cartItems])

    return (
        <div>
              <div  className={styles.card}>
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
                    <div className={styles.pay}>
                        { itemInCart ?
                            <div className={styles.in_cart}  onClick={() => router.push('/cart')}>
                                В корзине
                            </div>
                            :
                            <div className={styles.buy} onClick={() => addItem({ product, qty: 1 })}>
                                    В корзину
                            </div>
                        }
                        <div className={styles.price}>
                           {product.price} руб.
                        </div>
                    </div>
                    <div className={styles.code}>
                        <div>
                            Арт. { product.vendor_code }
                        </div>
                        <div>
                          { product.barcode }
                        </div>
                    </div>
                    <div className={styles.params}>
                        <Params params={ product.params }/>
                    </div>
                    <div className={styles.stocks}>
                        <Stocks stocks={ product.stocks } unit={product.unit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail