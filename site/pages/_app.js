import dynamic from 'next/dynamic'
import '../styles/globals.css'


const DynamicToolbar = dynamic(
  () => import('../components/Toolbar'),
  { loading: () => <p>Loading ...</p>,
    ssr: false }
)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <DynamicToolbar />
    </>
  )
}

export default MyApp
