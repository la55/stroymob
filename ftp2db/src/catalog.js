export const getCats = (categories) => {
    console.log('Parsing Cats ... ')
    console.log('Creating parent uid dict ... ')
    const parentKeys = categories.category.map(c => (
        { [c.$.id] : c.$.id_1c }
    )) 
    console.log('Done. Parent uid dict created  ')
    const cats = categories.category.map(c => (
        {
            id: c.$.id_1c,
            catId: parentKeys[c.$.parentId],
            title: c._
        }
    ))
    console.log('Done. Parsing cats')
}
