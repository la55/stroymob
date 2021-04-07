import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import styles from "../styles/Toolbar.module.css"

const ToolBar = () =>  {
  const [show, setShow] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 5000)
  }, [show])

  if (!show) return null

  return (
            <div className={styles.main}>
                <div onClick={() => { router.push('/') }}>
                    <img src="svg/home.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="svg/cart.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="svg/search.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="svg/filter2.svg" width="32" height="32"/>
                </div>
                <div>
                    <img src="svg/menu.svg" width="32" height="32"/>
                </div>
            </div>
        )
}

export default ToolBar
