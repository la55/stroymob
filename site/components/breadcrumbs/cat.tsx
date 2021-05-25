import Link from 'next/link'
import styles from './cat.module.scss'

const CatPath = ( {breadcrumbs} ) => {
    return (
        <div className={styles.grid}>
            { breadcrumbs.map(c => (
                <Link key={c.uid} href={`/catalog/${c.uid}`} >
                    <div className={styles.link}>
                        <span className={styles.arrow}>
                            &larr; 
                        </span>
                        <span className={styles.title}>
                            { c.title } 
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CatPath