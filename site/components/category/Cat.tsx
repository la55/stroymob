import { useState } from 'react'
import Link from 'next/link'
import styles from './Cat.module.scss'

const Cat = ({ cat }) => {
    const [image, setImage] = useState(`https://stroitel55.com/media/catphoto/${cat.id}.jpg`)

    return (
        <Link key={ cat.id } href={`/catalog/${cat.id}`}>
            <div className={styles.card}>
                <div className={styles.image}>
                <img
                    src={image}
                    onError={() => setImage('/static/svg/loading.gif')}
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
    )
}

export default Cat