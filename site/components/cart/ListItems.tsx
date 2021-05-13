import styles from './ListItems.module.scss'
import SingleItem from './Item'

const ListItems = ( { items }) => {

    return (
        <div className={styles.grid}>
            { items.map(item => (
                <SingleItem key={item.product.uid} product={item.product} qty={item.qty} />
            ))}
        </div>
    )
}

export default ListItems