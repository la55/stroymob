import mongoose from 'mongoose'

const CatSchema = new mongoose.Schema({
    uid: { type: String },
    parent_uid: { type: String },
    title: { type: String },
})

const Cat = mongoose.model('Cat', CatSchema)

export default Cat