import Product from "../../components/products/Product"

export const totalPrice = (cartItems) => {
    if (cartItems.length > 0) {
        const reducer = (price, item) => price + (parseFloat(item.product.price) * item.qty)
        return cartItems.reduce(reducer, parseFloat(0)).toFixed(2)
    }
    return parseFloat(0).toFixed(2)
}

export const addItemToCart = (cartItems, item) => {
    const itemToChange = cartItems.find(cartItem => cartItem.product.id === item.product.id)
    if (itemToChange) {
        return cartItems.map(cartItem => 
            cartItem.product.id === itemToChange.product.id ?
            { ...cartItem, qty: parseInt(cartItem.qty) + 1 } : cartItem
        )
    }
    return [...cartItems, item]
}

export const changeQty = (cartItems, itemId, newQty) => {
    const itemToChange = cartItems.find(cartItem => cartItem.product.id === itemId)
    if (itemToChange) {
        return cartItems.map(cartItem => 
            cartItem.product.id === itemToChange.product.id ?
            { ...cartItem, qty: parseInt(newQty) } : cartItem
        )
    }
    return [...cartItems]
}

export const removeItemFromCart = (cartItems, itemId) => {
    const itemToChange = cartItems.find(cartItem => cartItem.product.id === itemId)
    if (itemToChange.qty > 1) {
        return cartItems.map(cartItem => 
            cartItem.product.id === itemToChange.product.id ?
            { ...cartItem, qty: parseInt(cartItem.qty) - 1 } : cartItem
        )
    }
    return cartItems.filter(cartItem => cartItem.product.id !== itemId)
}