import { query, Request, Response } from 'express'
import Product from '../../models/product'


const searchProducts = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.query.title && !req.query.vendor_code && !req.query.barcode ) {
        return res.status(400).json('Missing query params title or vendor/bar_code')
    }
    const count_gt = req.query.count_gt || 0
    const sort = req.query.sort || 'price'
    let query_or_obj = []
    if (req.query.title) {
        const full = req.query.full ? '' : '^'
        const title = new RegExp(full + req.query.title.toString(), 'i') 
        query_or_obj.push({ title: title })
    }
    if (req.query.vendor_code) {
        const vendor_code = new RegExp('^' + req.query.vendor_code.toString(), 'i') 
        query_or_obj.push({ vendor_code: vendor_code })
    }
    if (req.query.barcode) {
        const barcode = new RegExp('^' + req.query.barcode.toString(), 'i') 
        query_or_obj.push({ barcode: barcode })
    }
    
    try {
        const products = await Product.find({
            count: { $gt: count_gt },
            $or: query_or_obj,
        }).sort(`${sort}`)
        return res.json(products)
    } catch (err) {
        console.log(err)
    }
}

export default searchProducts