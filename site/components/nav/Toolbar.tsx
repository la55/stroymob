import { useRouter } from 'next/router'
import styles from "./Toolbar.module.scss"

const ToolBar = () =>  {
  const router = useRouter()

  return (
            <div className={styles.main}>
                <div onClick={() => { router.push('/') }}>
                    <img src="/static/svg/home.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="/static/svg/cart.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="/static/svg/search.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="/static/svg/filter2.svg" width="32" height="32"/>
                </div>
                <div onClick={() => { router.push('/catalog/') }}>
                    <img src="/static/svg/menu.svg" width="32" height="32"/>
                </div>
            </div>
        )
}

export default ToolBar
