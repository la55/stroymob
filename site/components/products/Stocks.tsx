import styles from './Stocks.module.scss'

const Stocks = ({ stocks }) => {
    return (
        <div className={styles.grid}>
            { stocks.map(stock => (
                <div key={stock.id} className={styles.row}>
                    <div className={styles.title}>
                        { stock.title}
                    </div>
                    <div className={styles.count}>
                        {stock.count_str}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Stocks