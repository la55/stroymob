import { query, Request, Response } from 'express'
import Product from '../../models/product'

const ITEMS_ON_PAGE = 10

const searchProducts = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (!req.query.price_lt && !req.query.cat_uid && !req.query.title && !req.query.vendor_code && !req.query.barcode ) {
        return res.status(400).json('Missing query params, price or cat_uid or title or vendor/bar_code')
    }

    const sort_str = req.query.sort || 'price'

    const page = Number(req.query.page) || 1
    const on_page = Number(req.query.on_page) || ITEMS_ON_PAGE
    const skip = (page - 1) * on_page

    let or_obj = []
    let and_obj = []


    console.log(req.method)
    console.log(req.body)

    if (req.method == 'POST') {

        if (req.body.filters.length > 0) {

            req.body.filters.map((f: any) => {
                and_obj.push({ $or: f.value.map((v: any) => (
                        {
                            params: {name: f.name, value: v }
                        }
                    ))
                })
            })

        }
    }


    const price_gt = req.query.price_gt || -1 
    const price_lt = req.query.price_lt   
    const price = { price: price_lt ?
         { $gt: price_gt, $lt: price_lt } : { $gt: price_gt } }
    and_obj.push(price) 
    
    if (req.query.in_stock) {
        const in_stock = { in_stock: req.query.in_stock }
        and_obj.push(in_stock) 
    }

    if (req.query.cat_uid) {
        const cat_uid = { cat_uid: req.query.cat_uid }
        and_obj.push(cat_uid)
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
    if  (or_obj.length > 0) {
        and_obj.push({ $or: or_obj})
    }
    const q_obj = { $and: and_obj }
    
    try {
        const products = await Product.find(q_obj)
            .sort({ in_stock: -1, [String(sort_str)]: 1, _id: 1 }).limit(on_page).skip(skip)
        const products_count = await Product.countDocuments(q_obj)
        const max_pages = Math.ceil(products_count / on_page)
        return res.json({ count: products_count, page, max_pages, on_page, products })
        //return res.json(q_obj)
    } catch (err) {
        console.log(err)
    }
}

export default searchProducts