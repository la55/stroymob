export const getCats = (categories) => {
    const reducer = (obj, item) => {
         obj[item.$.id] = item.$.id_1c 
         return obj
    }
    const cat_uids = categories.category.reduce(reducer, {})
    const cats = categories.category.map(c => {
        const parent_uid = cat_uids[c.$.parentId]
        return (
            {
                uid: c.$.id_1c,
                parent_uid: parent_uid !== undefined ? parent_uid : 'top',
                title: c._
            }
        )
    })
    return { cats, cat_uids }
}
