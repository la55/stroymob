import Product from "../../components/products/Product"

export const totalPrice = (cartItems) =>  {
    if (cartItems.length > 0) {
        const reducer = (price, item) => price + (parseFloat(item.product.price) * item.qty)
        return parseFloat(cartItems.reduce(reducer, 0))
    }
    return parseFloat("0")
}

export const addItemToCart = (cartItems, item) => {
    const itemToChange = cartItems.find(cartItem => cartItem.product.uid === item.product.uid)
    if (itemToChange) {
        return cartItems.map(cartItem => 
            cartItem.product.uid === itemToChange.product.uid ?
            { ...cartItem, qty: parseInt(cartItem.qty) + 1 } : cartItem
        )
    }
    return [...cartItems, item]
}

export const changeQty = (cartItems, itemId, newQty) => {
    if (!Number.isInteger(parseInt(newQty)) || parseInt(newQty) < 1) {
        return [...cartItems]
    }
    const itemToChange = cartItems.find(cartItem => cartItem.product.uid === itemId)
    if (itemToChange) {
        return cartItems.map(cartItem => 
            cartItem.product.uid === itemToChange.product.uid ?
            { ...cartItem, qty: parseInt(newQty) } : cartItem
        )
    }
    return [...cartItems]
}

export const removeItemFromCart = (cartItems, itemId) => {
    const itemToChange = cartItems.find(cartItem => cartItem.product.uid === itemId)
    if (itemToChange.qty > 1) {
        return cartItems.map(cartItem => 
            cartItem.product.uid === itemToChange.product.uid ?
            { ...cartItem, qty: parseInt(cartItem.qty) - 1 } : cartItem
        )
    }
    return cartItems.filter(cartItem => cartItem.product.uid !== itemId)
}

export const clearItemsFromCart = (cartItems, itemId) => {
    return cartItems.filter(cartItem => cartItem.product.uid !== itemId)
}