import styles from './Stocks.module.scss'

const Stocks = ({ stocks, unit }) => {
    return (
        <div className={styles.grid}>
            { stocks.map(stock => (
                <div key={stock.shop_uid} className={styles.row}>
                    <div className={styles.title}>
                        { stock.shop_name}
                    </div>
                    <div className={styles.count}>
                        {stock.count} {unit}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Stocks