import Meta from '../components/meta/Meta'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
        <Meta title='Главная' keywords="111" description="222" />
        <h1>
          Сеть магазинов Строитель г.Омск
        </h1>
        <div className={styles.cover}>
        </div>
    </>
  )
}
