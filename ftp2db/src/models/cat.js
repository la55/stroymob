
const catSchema = new mongoose.Schema({
    uid: String,
    parent: String,
    title: String
})

const cat = mongoose.model('Cat', catSchema)