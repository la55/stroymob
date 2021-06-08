import { createContext, useEffect, useState } from 'react'
import { addItemToCart, changeQty,
     removeItemFromCart, totalPrice,
     clearItemsFromCart
     } from './cart.utils'

export const CartContext = createContext({
    cartItems: [],
    cartItemsCount: 0,
    cartTotalPrice: 0,
    addItem: (item) => {},
    changeItemQty: (itemId, newQty) => {},
    removeItem: (itemId) => {},
    clearItems: (itemId) => {},
})



const CartProvider = ({ children }) => {


    let storedItems
    if (typeof window !== 'undefined') {
        storedItems = JSON.parse(localStorage.getItem('cart')) || []
    } else {
        storedItems =  []
    }
    const [cartItems, setCartItems] = useState(storedItems)
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const [cartTotalPrice, setCartTotalPrice] = useState(0.00)

    const addItem = item => setCartItems(addItemToCart(cartItems, item))
    const changeItemQty = (itemId, newQty) => setCartItems(changeQty(cartItems, itemId, newQty))
    const removeItem = itemId => setCartItems(removeItemFromCart(cartItems, itemId))
    const clearItems = itemId => setCartItems(clearItemsFromCart(cartItems, itemId))


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        setCartItemsCount(cartItems.length)
        setCartTotalPrice(totalPrice(cartItems))
    }, [cartItems])

    return (
        <CartContext.Provider value={{
            cartItems,
            cartItemsCount,
            cartTotalPrice,
            addItem,
            changeItemQty,
            removeItem,
            clearItems
        }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartProvider