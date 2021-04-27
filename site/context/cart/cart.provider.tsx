import { createContext, useEffect, useState } from 'react'
import { addItemToCart } from './cart.utils'

export const CartContext = createContext({
    cartItems: [],
    cartItemsCount: 0,
    addItem: () => {},
    removeItem: () => {},
    clearItems: () => {}
})



const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [cartItemsCount, setCartItemsCount] = useState(0)

    const addItem = item => setCartItems(addItemToCart(cartItems, item))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCartItems(JSON.parse(localStorage.getItem('cart')) || [])
        }
    }, [])

    useEffect(() => {
        console.log(cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        setCartItemsCount(cartItems.length)
    }, [cartItems])

    return (
        <CartContext.Provider value={{
            cartItems,
            cartItemsCount,
            addItem
        }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartProvider