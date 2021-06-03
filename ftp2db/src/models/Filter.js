import mongoose from 'mongoose'

export const FilterSchema = new mongoose.Schema({
    cat_uid: { type: String },
    params: { type: Array },
},{ timestamps: true })

const Filter = mongoose.model('Filter', FilterSchema)

export default Filter