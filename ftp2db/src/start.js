import fs from 'fs'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import downloadZip from './download.js'
import extractXML from './unzip.js'
import parseCatalog from './parser/parser.js'
import { unzip } from 'zlib'

const MEDIA_DIR = './media/'
const ZIP_FILE = 'Export.zip'
const XML_FILE = 'export.xml'

dotenv.config()

const main = async () => {

    await mongoose.connect('mongodb://localhost/test',
        {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection
    console.log('Connected to MongoDB')

    await downloadZip(MEDIA_DIR, ZIP_FILE)
    console.log(`Downloaded ${ZIP_FILE}`)
    await extractXML(MEDIA_DIR, ZIP_FILE, XML_FILE)
    console.log(`Extracted ${XML_FILE}`)

    const xml = fs.readFileSync('./media/export_with_params.xml')
    const { cats, products } = await parseCatalog(xml)
    console.log(`Parsed Catalog`)

    db.close()
}

main()
