import fs from 'fs'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import downloadZip from './download.js'
import extractXML from './unzip.js'
import parseCatalog from './parser/parser.js'
import createCatalog from './create.js'

const MEDIA_DIR = './media/'
const ZIP_FILE = 'Export.zip'
const XML_FILE = 'export.xml'

dotenv.config()

const main = async () => {
    const conn_str = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    try {
      await mongoose.connect(conn_str, {
              useNewUrlParser: true, 
              useCreateIndex: true,
              useUnifiedTopology: true
          })
      console.log('Connected to MongoDB')
    } catch {
      console.log('Error connection to DB')
    }
    const db = mongoose.connection

    await downloadZip(MEDIA_DIR, ZIP_FILE)
    console.log(`Downloaded ${ZIP_FILE}`)

    await extractXML(MEDIA_DIR, ZIP_FILE, XML_FILE)
    console.log(`Extracted ${XML_FILE}`)

    const xml = fs.readFileSync(MEDIA_DIR + XML_FILE)
    //const xml = fs.readFileSync('./media/export_with_params.xml')

    const { cats, products } = await parseCatalog(xml)
    console.log(`Catalog parsed`)

    await createCatalog({cats, products})
    console.log(`Catalog created`)

    db.close()
}

main()
