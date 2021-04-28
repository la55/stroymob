import styles from './ListItems.module.scss'
import SingleItem from './Item'

const ListItems = ( { items }) => {

    return (
        <div className={styles.grid}>
            { items.map(item => (
                <SingleItem key={item.product.id} product={item.product} qty={item.qty} />
            ))}
        </div>
    )
}

export default ListItems