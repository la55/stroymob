import express from 'express'
import router from './routes.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const PORT = 5000
const app = express()
app.use(router)

const start = async () => {

    try {
        await mongoose.connect(`mongodb://api:api@${process.env.DB_IP}/catalog`, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
        })
        console.log('Connected to DB')
    } catch(err) {
        console.log(err)
    }

    app.listen(PORT, () => {
        console.log(`API started on ${PORT}`)
    })

}

start()
