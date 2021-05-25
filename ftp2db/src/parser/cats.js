
export const getCats = (categories) => {
    const reducer = (obj, item) => {
         obj[item.$.id] = item 
         return obj
    }
    const cat_uids = categories.category.reduce(reducer, {})
    const cats = categories.category.map(c => {
        const parent = cat_uids[c.$.parentId]
        if (!parent) {
            console.log('No parent')
        }
        const parent_uid = parent !== undefined ? parent.$.id_1c : 'top'
        const breadcrumbs = parent !== undefined ?
            getBreadcrumbs(parent, [{ uid: parent.$.id_1c, title: parent._ }], cat_uids) : []

        return (
            {
                uid: c.$.id_1c,
                parent_uid: parent_uid,
                title: c._,
                breadcrumbs: breadcrumbs, 
            }
        )
    })
    return { cats, cat_uids }
}

const getBreadcrumbs = (cat, breadcrumbs, cat_uids) => {
    if (parseInt(cat.$.parentId) > 0) {
        const parent = cat_uids[cat.$.parentId]
        const new_breadcrumbs = [...breadcrumbs, { uid: parent.$.id_1c, title: parent._ }]
        const results = getBreadcrumbs(parent, new_breadcrumbs, cat_uids)
        return results
    }
    const path = breadcrumbs.reverse()
    return path
}