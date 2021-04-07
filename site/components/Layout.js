import dynamic from 'next/dynamic'
import Meta from '../components/Meta'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import styles from '../styles/Layout.module.css'

const Layout = ({children}) => {
    return (
            <>
                <Meta />
                <Nav />
                <div className={styles.container}>
                    <main className={styles.main}>
                        { children }
                    </main>
                    <DynamicToolbar />
                </div>
            </>
    )
}

const DynamicToolbar = dynamic(
    () => import('../components/Toolbar'),
    { loading: () => <Loading />,
      ssr: false }
  )

export default Layout