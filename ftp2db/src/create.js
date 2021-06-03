import Cat from './models/Cat.js'
import Product from './models/Product.js'
import Filter from './models/Filter.js'

const createCatalog = async ({ cats, products, filters}) => {

    try {
        await Cat.deleteMany()
        await Product.deleteMany()
        await Filter.deleteMany()
        await Cat.insertMany(cats)
        await Product.insertMany(products)
        await Filter.insertMany(filters)
    }
    catch (error) {
        console.log(error)
    }
}

export default createCatalog
