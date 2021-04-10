import Link from 'next/link'
import CatList from '../../components/category/CatList'

const Cat = ({ cat }) => {
    return (
        <>
            <Link href={`/catalog/${cat.catId !== 'top' ? cat.catId : ''}`} >
               &larr; назад 
            </Link>
            <h1>
                { cat.title}
            </h1>
            <CatList cats={cat.cats} />
        </>
    )
}

export default Cat

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`${process.env.INNER_DATA_API}/api1/cats/${params.slug}`)
    const cat = await res.json()

    return {
        props: {
            cat
        }
    }
}