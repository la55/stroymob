import dynamic from 'next/dynamic'
import Meta from '../meta/Meta'
import Nav from '../nav/Nav'
import Loading from '../loading/Loading'
import styles from './Layout.module.scss'

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
    () => import('../nav/Toolbar'),
    { loading: () => <Loading />,
      ssr: false }
  )

export default Layout