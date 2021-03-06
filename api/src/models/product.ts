import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    uid: {type: String},
    cat_uid: {type: String},
    title: {type: String},
    vendor_code: {type: String},
    barcode: {type: String},
    unit: {type: String},
    price: {type: Number},
    description: {type: String},
    stocks: {type: Array},
    params: {type: Array},
    count: {type: Number},
    in_stock: {type: Boolean},
},{
    toJSON: {
        transform(doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.description
        }
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product 