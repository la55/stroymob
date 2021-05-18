import { query, Request, Response } from 'express'
import Product from '../../models/product'

const ITEMS_ON_PAGE = 10

const searchProducts = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!req.query.cat_uid && !req.query.title && !req.query.vendor_code && !req.query.barcode ) {
        return res.status(400).json('Missing query params, cat_uid or title or vendor/bar_code')
    }

    const sort_str = req.query.sort || 'price'

    const page = Number(req.query.page) || 1
    const on_page = Number(req.query.on_page) || ITEMS_ON_PAGE
    const skip = (page - 1) * on_page
    console.log('Page:', page, 'on:', on_page, 'Skip:', skip)

    let or_obj = []
    let and_obj = {}

    const count_gt = req.query.count_gt || 0
    and_obj = { ...and_obj, count: { $gt: count_gt} }

    const price_gt = req.query.price_gt || 0
    const price_lt = req.query.price_lt   
    const price = price_lt ?
         { $gt: price_gt, $lt: price_lt } : { $gt: price_gt }
    and_obj = { ...and_obj, price }
    
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
    
    try {
        const products = await Product.find(and_obj)
            .sort({ [String(sort_str)]: 1, _id: 1 }).limit(on_page).skip(skip)
        const products_count = await Product.countDocuments(and_obj)
        const max_pages = Math.ceil(products_count / on_page)
        return res.json({ count: products_count, page, max_pages, on_page, products })
    } catch (err) {
        console.log(err)
    }
}

export default searchProducts