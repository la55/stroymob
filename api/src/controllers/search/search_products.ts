import { query, Request, Response } from 'express'
import Product from '../../models/product'

const ITEMS_ON_PAGE = 10

const searchProducts = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!req.query.cat_uid && !req.query.title && !req.query.vendor_code && !req.query.barcode ) {
        return res.status(400).json('Missing query params, cat_uid or title or vendor/bar_code')
    }

    const sort = req.query.sort || 'price'

    const page = req.query.page || 1
    const on_page = req.query.on_page || ITEMS_ON_PAGE
    const skip = (<number>page * <number>on_page) - 1

    let or_obj = []
    let and_obj = {}

    const count_gt = req.query.count_gt || 0
    and_obj = { ...and_obj, count: { $gt: count_gt} }
    
    if (req.query.cat_uid) {
        const cat_uid = req.params.cat_uid
        and_obj = { ...and_obj, cat_uid }
    }

    if (req.query.title) {
        const full = req.query.full ? '' : '^'
        const title = new RegExp(full + req.query.title.toString(), 'i') 
        or_obj.push({ title: title })
    }
    if (req.query.vendor_code) {
        const vendor_code = new RegExp('^' + req.query.vendor_code.toString(), 'i') 
        or_obj.push({ vendor_code: vendor_code })
    }
    if (req.query.barcode) {
        const barcode = new RegExp('^' + req.query.barcode.toString(), 'i') 
        or_obj.push({ barcode: barcode })
    }
    and_obj = { ...and_obj, $or: or_obj }
    console.log(and_obj)
    
    try {
        const products = await Product.find(and_obj)
            .sort(`${sort}`).skip(skip).limit(<number>on_page * 1)
        return res.json(products)
    } catch (err) {
        console.log(err)
    }
}

export default searchProducts