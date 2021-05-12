import { Request, Response } from 'express'
import Cat from '../models/cat'
import Product from '../models/product'

const home = async (req: Request, res: Response) => {
    try {
        const cats_count = await Cat.countDocuments()
        const products_count = await Product.countDocuments()
        return res.json({
            Cats: cats_count,
            Products: products_count,
        })
    } catch (err) {
        console.log(err)
        return res.json("Error getting home statistic data")
    }
}

export default home