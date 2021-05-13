import { Request, Response } from 'express'
import Product from '../../models/product'

const productDetail = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({uid: req.params.uid})
        console.log(product.createdAt)
        return res.json(product)
    } catch (err) {
        console.log(err)
    }
}

export default productDetail