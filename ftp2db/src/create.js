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
}

export default createCatalog
