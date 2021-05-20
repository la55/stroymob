import { useState, useEffect } from 'react'
import {fetchCats} from './utils'
import CatList from '../category/CatList'

const ON_PAGE = 50

const AllCats = ({ term }) => {
    const [results, setResults] = useState([])

    useEffect(() => {
        const searchCats = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            const cats = await fetchCats(host, term, ON_PAGE)
            setResults(cats)
        }
        searchCats()
    }, [])


    return (
        <div>
            <h1>По запросу "{term}"</h1>
                <CatList cats={results} />
        </div>
    )
}

export default AllCats