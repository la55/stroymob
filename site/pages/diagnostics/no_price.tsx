import dynamic from 'next/dynamic'

const DynamicNoPriceStock = dynamic(
    () => import('../../components/diagnostics/NoPriceStocks'),
    { ssr: false }
)

const NoPricePage = () => {
    return (
        <DynamicNoPriceStock />
    )
}

export default NoPricePage