import { useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'
import CartItems from './ListItems'

const Cart = () => {
    const { cartItems, cartItemsCount, cartTotalPrice } = useContext(CartContext)

    return (
        <>
            <CartItems items={cartItems} />
            <div>Всего наименований: { cartItemsCount } </div>
            <div>Сумма: { cartTotalPrice } руб. </div>
        </>
    )
}

export default Cart