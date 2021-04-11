import Cat from './Cat'
import styles from './CatList.module.scss'

const CatList = ({ cats }) => (
    <div className={styles.grid}>
        { cats.map(cat => (
            <Cat cat={cat} key={cat.id} />
        ))}
    </div>
)

export default CatList