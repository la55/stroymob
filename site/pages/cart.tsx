import dynamic from 'next/dynamic'

const DynamicCart = dynamic(
    () => import('../components/cart/Cart'),
    { ssr: false }
)


const CartPage = () => {

    return (
        <DynamicCart />
    )
}

export default CartPage