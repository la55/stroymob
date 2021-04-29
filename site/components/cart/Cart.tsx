import { useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'
import CartItems from './ListItems'
import styles from './Cart.module.scss'

const Cart = () => {
    const { cartItems, cartItemsCount, cartTotalPrice } = useContext(CartContext)
    const strTotalPrice = cartTotalPrice.toFixed(2)

    return (
        <div className={styles.grid}>
            <CartItems items={cartItems} />
            <div className={styles.total} >
                <div>
                    Итого: { cartItemsCount }
                </div>
                <div className={styles.price}>
                    { strTotalPrice } руб.
                </div>
            </div>
        </div>
    )
}

export default Cart