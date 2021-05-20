
interface Data {
    count: number,
    page: number,
    on_page: number,
    max_pages: number,
    products: any
}

export const fetchProducts = async (host: string, term: string, page: number, on_page: number) => {
    let data: Data = { count: 0, page, on_page, max_pages: 1,  products: [] }

    if (!Number.isInteger(parseInt(term[0]))) {
        let res =  await fetch(`${host}/api1/products/?page=${page}&on_page=${on_page}&title=${term}`)
        data = await res.json()
    }
    if (data.count < 1 && !Number.isInteger(parseInt(term[0]))) {
        let res =  await fetch(`${host}/api1/products/?page=${page}&on_page=${on_page}&title=${term}&full=1`)
        data = await res.json()
    }
    if (data.count < 1) {
        let res =  await fetch(`${host}/api1/products/?page=${page}&on_page=${on_page}&vendor_code=${term}&barcode=${term}`)
        data = await res.json()
    }
    if (data.count < 1) {
        let res =  await fetch(`${host}/api1/products/?page=${page}&on_page=${on_page}&count_gt=-1&title=${term}&full=1&vendor_code=${term}&barcode=${term}`)
        data = await res.json()
    }
    return data
}

export const fetchCats = async (host: string, term: string, on_page: number) => {
    let data = []
    let res
    res =  await fetch(`${host}/api1/cats/?title=${term}`)
    data = await res.json()
    if (data.length < on_page) {
        res =  await fetch(`${host}/api1/cats/?title=${term}&full=1`)
        const full_data = await res.json()
        const uids = data.map(d => d.uid)
        data = [...data, ...full_data.filter(d => uids.indexOf(d.uid) === -1)]
    }
    return data
}