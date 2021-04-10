import Link from 'next/link'
import styles from '../../styles/CatList.module.css'

const CatList = ({ cats }) => (
    <div className={styles.grid}>
        { cats.map(cat => (
            <Link key={ cat.id } href={`/catalog/${cat.id}`}>
                <div className={styles.card}>
                    <div className={styles.title}>
                        { cat.title }
                    </div>
                    <div className={styles.arrow}>
                        &rarr;
                    </div>
                </div>
            </Link>
        ))}
    </div>
)

export default CatList