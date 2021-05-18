import dynamic from 'next/dynamic'

const DynamicSearch = dynamic(
    () => import('../../components/search/Search'),
    { ssr: false }
)

const SearchPage = () => {
    return (
        <DynamicSearch />
    )
}

export default SearchPage