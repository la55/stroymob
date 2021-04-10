import styles from '../styles/Loading.module.css'

export default function Loading () {
    return (
        <div className={styles.main}>
            <img src="/static/svg/loading.gif" className={styles.loading} />
        </div>
    )
}