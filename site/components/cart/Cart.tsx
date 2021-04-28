import { useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'
import CartItems from './ListItems'

const Cart = () => {
    const { cartItems, cartItemsCount, cartTotalPrice } = useContext(CartContext)
    const strTotalPrice = cartTotalPrice.toFixed(2)

    return (
        <>
            <CartItems items={cartItems} />
            <div>Всего наименований: { cartItemsCount } </div>
            <div>Сумма: { strTotalPrice } руб. </div>
        </>
    )
}

export default Cart