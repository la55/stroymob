export const getProducts = (offers, cat_uids) => {
    const cat_params = {}

    const products = offers.offer.map(p => {
        const stocks_data = p.shops.shop
        const param_data = p.param
        const stocks = stocks_data === undefined ? 
            [] : Array.isArray(stocks_data) ?
             stocks_data.map(s => ({
                 shop_name: s.$.name,
                 shop_uid: s.$.id_1c,
                 count: parseInt(s.count)
             }))
              :
            [stocks_data].map(s => ({
                 shop_name: s.$.name,
                 shop_uid: s.$.id_1c,
                 count: parseInt(s.count)
             }))
        const params = param_data === undefined ?
            [] : Array.isArray(param_data) ?
             param_data.map(p => ({
                 name: p.$ !== undefined ? p.$.name : '',
                 value: p._
             }))
              :
            [param_data].map(p => ({
                 name: p.$ !== undefined ? p.$.name : '',
                 value: p._
             }))

             const count_reducer = (total, shop) => total + parseInt(shop.count)
             const count = stocks.reduce(count_reducer, 0)

        const  cat_uid = cat_uids[p.categoryId].$.id_1c
        
        params.map(p => {
            if (cat_params[cat_uid] === undefined) {
                cat_params[cat_uid] = [{name: p.name, values: [p.value]}]
            } else {
                const filter_exist = cat_params[cat_uid].find(f => f.name === p.name)
                if (filter_exist) {
                    if (filter_exist.values.indexOf(p.value) === -1) {
                        const rest_el = cat_params[cat_uid].filter(f => f.name !== p.name)
                        cat_params[cat_uid] = [...rest_el,
                             { name: p.name, values: [...filter_exist.values, p.value]}
                        ]
                    }
                } else {
                    cat_params[cat_uid].push({name: p.name, values: [p.value]})
                }
            }
        })

        return (
            {
                uid: p.$.id_1c,
                cat_uid: cat_uid,
                title: p.name,
                vendor_code: p.vendorCode,
                barcode: p.barcode,
                unit: p.unit,
                price: p.price.replace('\xa0', '').replace(',','.'),
                description: p.description,
                stocks: stocks,
                params: params,
                count: count,
                in_stock: count > 0 ? true : false,
            }
        )
    })

    const filters = Object.keys(cat_params).map(cat_uid => ({
        cat_uid: cat_uid,
        params: cat_params[cat_uid]
    }))

    return {products, filters}
}