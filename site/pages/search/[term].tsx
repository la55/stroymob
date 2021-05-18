import dynamic from 'next/dynamic'

const DynamicSearchResults = dynamic(
    () => import('../../components/search/SearchResults'),
    { ssr: false }
)

const SearchResultsPage = ({ term }) => {
    return (
        <DynamicSearchResults term={term} />
    )
}

export default SearchResultsPage

export const getServerSideProps = async ({ params }) => {

    const term = params.term

    return {
        props: {
            term
        }
    }
}