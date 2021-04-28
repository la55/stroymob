import { useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'

const SingleItem = ({product, qty}) => {
    const { addItem, changeItemQty, removeItem } = useContext(CartContext)

    return (
        <>
            <div>{ product.title }</div>
            <div>
                <span onClick={() => removeItem(product.id)}>&larr;</span>
                <input type="text" value={ qty }
                 onChange={(e) => changeItemQty(product.id, e.target.value)}/>
                <span onClick={() => addItem({ product, qty: 1 })}>&rarr;</span>
            </div>
        </>
    )
}

export default SingleItem