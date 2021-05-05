import Cat from './models/Cat.js'
import Product from './models/Product.js'

const createCatalog = async ({ cats, products}) => {

    try {
        await Cat.deleteMany()
        await Cat.insertMany(cats)
        await Product.deleteMany()
        await Product.insertMany(products)
    }
    catch (error) {
        console.log(error)
    }
    const ruletka1 = await Product.findOne({ uid: '2db1ca33-d2a4-11e2-9753-c0143dc3cacc'})
    console.log(ruletka1.title)
    console.log(ruletka1.price)
}

export default createCatalog