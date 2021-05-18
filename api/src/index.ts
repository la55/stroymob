import express from 'express'
import router from './routes'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const PORT = 5000
const app = express()
app.use(router)
app.all('*', async (req, res) => {
    res.json('Route not found')
})

const start = async () => {

    const connectToDB = async () => {
        const conn_str = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

        const conn_options =  {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        try {
            await mongoose.connect(conn_str, conn_options)
            console.log('Connected to DB')
        } catch(err) {
            console.log('Error connect to DB. Trying again')
            setTimeout(connectToDB, 5000)
        }
    }
    connectToDB()

    app.listen(PORT, () => {
        console.log(`API started on ${PORT}`)
    })

}

start()
