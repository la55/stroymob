import Layout from '../components/layout/Layout'
import '../styles/globals.scss'
import  CartProvider  from '../context/cart/cart.provider'



function MyApp({ Component, pageProps }) {
  return (
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
  )
}

export default MyApp
