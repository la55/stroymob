import styles from './Nav.module.scss'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className={styles.main}>
            <Link href="/">
                Главная
            </Link>
            <Link href="/about/">
                О нас
            </Link>
            <Link href="/catalog/">
                Каталог
            </Link>
        </div>
    )
}

export default Nav