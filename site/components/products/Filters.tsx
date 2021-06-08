import { useEffect, useState } from 'react'
import styles from './Filters.module.scss'

const Filters = ({ catParams, showFilters, setShowFilters,
     realFilters, setRealFilters, setPageNum, setResults }) => {

    const [params, setParams] = useState(catParams)
    const [filters, setFilters] = useState(realFilters)


    useEffect(() => {
        setParams(catParams)
    }, [filters])

    const resetResults = () => {
        setPageNum(1)
        setResults([])
        setRealFilters(filters)
        setShowFilters(false)
    }

    const applyFilter = () => {
        resetResults()
    }
    
    const dropFilter = () => {
        setFilters([])
    }

    const addValue = (name, value) => {
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
        <div className={showFilters ? styles.show : styles.hide}>
            <div className={styles.control}>
                <div onClick={() => applyFilter()} className={styles.apply}>
                    Применить
                </div>
                <div onClick={() => dropFilter()} className={styles.drop}>
                    Сбросить
                </div>
            </div>
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
        </div>
    )
}

export default Filters