export const getProducts = (offers, cat_uids) => {
    const products = offers.offer.map(p => {
        const stocks_data = p.shops.shop
        const param_data = p.param.param
        const stocks = stocks_data === undefined ? 
            [] : Array.isArray(stocks_data) ? stocks_data : [stocks_data]
        const params = param_data === undefined ?
            [] : Array.isArray(param_data) ? param_data : [param_data]
        return (
            {
                uid: p.$.id_1c,
                cat_uid: cat_uids[p.categoryId],
                title: p.name,
                vendor_code: p.vendorCode,
                barcode: p.barcode,
                unit: p.unit,
                price: p.price.replace('\xa0', ''),
                description: p.description,
                stocks: stocks,
                params: params
            }
        )
    })
    return products
}