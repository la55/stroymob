import { useRouter } from 'next/router'
import { useContext } from 'react'
import { CartContext } from '../../context/cart/cart.provider'
import styles from "./Toolbar.module.scss"

const ToolBar = () =>  {
  const router = useRouter()
  console.log(router.pathname)
  const { cartItemsCount } = useContext(CartContext)

  return (
            <div className={styles.main}>
                <div
                 style={{ borderBottom: router.pathname === '/' ? '1px solid white' : 'none' }}
                 onClick={() => { router.pathname === '/' ? router.back() :  router.push('/') }}>
                    <img src="/static/svg/home.svg" width="32" height="32"/>
                </div>
                <div className={styles.cart} 
                 style={{ borderBottom: router.pathname === '/cart' ? '1px solid white' : 'none' }}
                 onClick={() => { router.pathname === '/cart' ? router.back() :  router.push('/cart/') }}>
                    <img src="/static/svg/cart.svg" width="32" height="32"/>
                    <span className={styles.count}>
                        { cartItemsCount }
                    </span>
                </div>
                <div 
                 style={{ borderBottom: router.pathname === '/search' ? '1px solid white' : 'none' }}
                 onClick={() => { router.pathname === '/search' ? router.back() :  router.push('/search/') }}>
                    <img src="/static/svg/search.svg" width="32" height="32"/>
                </div>
                <div onClick={() => { router.back() }}>
                    <img src="/static/svg/filter2.svg" width="32" height="32"/>
                </div>
                <div
                 style={{ borderBottom: router.pathname === '/catalog' ? '1px solid white' : 'none' }}
                 onClick={() => { router.pathname === '/catalog' ? router.back() :  router.push('/catalog/') }}>
                    <img src="/static/svg/menu.svg" width="32" height="32"/>
                </div>
            </div>
        )
}

export default ToolBar
