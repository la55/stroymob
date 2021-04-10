import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/CatList.module.css'

const CatList = ({ cats }) => (
    <div className={styles.grid}>
        { cats.map(cat => (
            <Link key={ cat.id } href={`/catalog/${cat.id}`}>
                <div className={styles.card}>
                    <div className={styles.image}>
                    <Image
                        src={`https://stroitel55.com/media/catphoto/${cat.id}.jpg`}
                        alt={ cat.title }
                        width={50}
                        height={50}
                    />
                    </div>
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