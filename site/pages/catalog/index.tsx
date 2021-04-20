import CatList from '../../components/category/CatList'

const Catalog = ({ cats }) => {
    return (
        <>
            <h1>
                Каталог
            </h1>
            <CatList cats={cats} />
        </>
    )
}

export default Catalog

export const getServerSideProps = async ({ req }) => {
    const res = await fetch(`${process.env.INNER_DATA_API}/api1/catalog`)
    const cats = await res.json()

    return {
        props: {
            cats
        }
    }
}