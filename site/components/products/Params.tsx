import styles from './Params.module.scss'

const Params = ({params}) => {

    return (
        <div className={styles.grid}>
            { params.map(param => (
                <div key={param.name} className={styles.row}>
                <div className={styles.name}>{ param.name}:</div>
                <div className={styles.value}>{ param.value}</div>
                </div>
            ))}

        </div>
    )

}

export default Params