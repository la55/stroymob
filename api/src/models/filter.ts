import mongoose from 'mongoose'

export const FilterSchema = new mongoose.Schema({
    cat_uid: { type: String },
    params: { type: Array },
},{
    toJSON: {
        transform(doc, ret) {
            delete ret._id
            delete ret.__v
        }
    }
})

const Filter = mongoose.model('Filter', FilterSchema)

export default Filter