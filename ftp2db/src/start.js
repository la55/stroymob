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

    await mongoose.connect('mongodb://ftp2db:88888@localhost/catalog', {
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true
        })
    const db = mongoose.connection
    console.log('Connected to MongoDB')

    //await downloadZip(MEDIA_DIR, ZIP_FILE)
    //console.log(`Downloaded ${ZIP_FILE}`)
    //await extractXML(MEDIA_DIR, ZIP_FILE, XML_FILE)
    //console.log(`Extracted ${XML_FILE}`)

    const xml = fs.readFileSync(MEDIA_DIR + XML_FILE)
    //const xml = fs.readFileSync('./media/export_with_params.xml')
    const { cats, products } = await parseCatalog(xml)
    console.log(`Parsed Catalog`)
    await createCatalog({cats, products})

    db.close()
}

main()
