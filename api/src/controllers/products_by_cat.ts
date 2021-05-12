import { Request, Response } from 'express'
import Product from '../models/product'


const productsByCat = async (req: Request, res: Response) => {
    const cat_uid = req.params.cat_uid
    const order = req.query.order || null
    const price_gt = req.query.price_gt || 0
    const price_lt = req.query.price_lt   
    const price = price_lt ?
         { $gt: price_gt, $lt: price_lt } : { $gt: price_gt }
    const count_gt = req.query.count_gt || 0
    const count_lt = req.query.count_lt   
    const count = count_lt ?
         { $gt: count_gt, $lt: count_lt } : { $gt: count_gt }
    
    try {
        const products = await Product.find({
            cat_uid,
            price,
            count
        }).sort(`${order}`)
        return res.json(products)
    } catch (err) {
        console.log(err)
    }
}

export default productsByCat