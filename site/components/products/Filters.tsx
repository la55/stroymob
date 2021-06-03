import { useEffect, useState } from 'react'
import styles from './Filters.module.scss'

const Filters = ({ cat_uid, filters, setFilters, setPageNum, setResults }) => {

    const [params, setParams] = useState([])

    useEffect(() => {
        const getParams = async () => {
            const host = process.env.NEXT_PUBLIC_DATA_API
            const res = await fetch(`${host}/api1/filters/${cat_uid}`)
            const data = await res.json()
            console.log(data)
            setParams(data.params)
        }
        getParams()
    },[])

    useEffect(() => {
        console.log('Filters: ', filters)
        setParams(params)
    }, [filters])

    const addValue = (name, value) => {
        console.log(name, value)
        setResults([])
        setPageNum(1)
        const filter = filters.find(f => f.name === name)
        if (filter) {
            const restElements = filters.filter(f => f.name !== name)
            if (filter.values.indexOf(value) === -1) {
                setFilters([...restElements,
                {name: name, values: [...filter.values, value]}])
            } else {
                if (filter.values.length > 1) {
                    const thisElement = {name: name, values: [...filter.values.filter(v => v !== value)]}
                    setFilters([...restElements, thisElement])
                } else {
                    setFilters(restElements)
                }
            }
        } else {
            setFilters([...filters, {name: name, values: [value]}])
        }
    }
    const isSelected = (name, value) => {
        const filter = filters.find(f => f.name === name)
        if (!filter) {
            return false
        }
        if (filter.values.indexOf(value) === -1) {
            return false
        }
        return true
    }



    return (
        <div className={styles.grid}>
            {params.map(f=> (
                <div key={f.name} className={styles.item}>
                    <div className={styles.name}>
                        {f.name}:
                    </div>
                    <ul className={styles.values}>
                        {f.values.map(value => (
                                <li key={value} className={styles.value}>
                                    <span
                                     className={isSelected(f.name, value) ? styles.selected : styles.default}
                                        onClick={(e) => addValue(f.name, value)}>
                                        {value}
                                    </span>
                                </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Filters