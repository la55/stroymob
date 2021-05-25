import { Request, Response } from 'express'
import Product from '../../models/product'
import Cat from '../../models/cat'

const productDetail = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({uid: req.params.uid})
        const cat = await Cat.findOne({uid: product.cat_uid})
        return res.json({product, cat})
    } catch (err) {
        console.log(err)
    }
}

export default productDetail