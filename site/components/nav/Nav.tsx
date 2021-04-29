import styles from './Nav.module.scss'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className={styles.main}>
            <Link href="/">
                СтроительОмск
            </Link>
        </div>
    )
}

export default Nav