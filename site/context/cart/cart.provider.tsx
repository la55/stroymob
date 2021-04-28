import { createContext, useEffect, useState } from 'react'
import { addItemToCart, changeQty, removeItemFromCart, totalPrice } from './cart.utils'

export const CartContext = createContext({
    cartItems: [],
    cartItemsCount: 0,
    cartTotalPrice: 0,
    addItem: () => {},
    changeItemQty: () => {},
    removeItem: () => {},
    clearItems: () => {}
})



const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    const addItem = item => setCartItems(addItemToCart(cartItems, item))
    const changeItemQty = (itemId, newQty) => setCartItems(changeQty(cartItems, itemId, newQty))
    const removeItem = itemId => setCartItems(removeItemFromCart(cartItems, itemId))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCartItems(JSON.parse(localStorage.getItem('cart')) || [])
            setCartItemsCount(cartItems.length)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        setCartItemsCount(cartItems.length)
        setCartTotalPrice(totalPrice(cartItems))
        console.log(cartItems)
        console.log(cartTotalPrice)
    }, [cartItems])

    return (
        <CartContext.Provider value={{
            cartItems,
            cartItemsCount,
            cartTotalPrice,
            addItem,
            changeItemQty,
            removeItem,
        }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartProvider