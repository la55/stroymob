import dynamic from 'next/dynamic'

const DynamicSearchResults = dynamic(
    () => import('../../../components/search/AllCats'),
    { ssr: false }
)

const SearchCatsPage = ({ term }) => {
    return (
        <DynamicSearchResults term={term} />
    )
}

export default SearchCatsPage

export const getServerSideProps = async ({ params }) => {

    const term = params.term

    return {
        props: {
            term
        }
    }
}