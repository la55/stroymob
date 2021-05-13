import Cat from './Cat'
import styles from './CatList.module.scss'

const CatList = ({ cats }) => (
    <div className={styles.grid}>
        { cats.map(cat => (
            <Cat cat={cat} key={cat.uid} />
        ))}
    </div>
)

export default CatList