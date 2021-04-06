import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Сеть магазинов Строитель г.Омск
        </h1>
      </main>

      <footer className={styles.footer}>
          Copiright, 2021
      </footer>
    </div>
  )
}
