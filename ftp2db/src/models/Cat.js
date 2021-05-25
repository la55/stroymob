import mongoose from 'mongoose'

export const CatSchema = new mongoose.Schema({
    uid: { type: String },
    parent_uid: { type: String },
    title: { type: String },
    breadcrumbs: { type: Array },
},{ timestamps: true })

const Cat = mongoose.model('Cat', CatSchema)

export default Cat
