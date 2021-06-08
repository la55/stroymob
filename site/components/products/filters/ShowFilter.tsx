import styles from './ShowFilter.module.scss'

const ShowFilter = ({ filters, resCount, setShowFilters }) => {
    return (
        <div className={styles.panel}>
            <div className={styles.filter} onClick={() => setShowFilters(true)}>
                <span>
                    ФИЛЬТР ({filters.length})
                </span>
            </div>
            <div className={styles.count}>
                ВСЕГО: { resCount }
            </div>
        </div>
    )
}

export default ShowFilter