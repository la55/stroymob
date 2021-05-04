import fs from 'fs'
import Client  from 'ftp'
import unzipper from 'unzipper'
import dotenv from 'dotenv'
import { parseFunc } from './parser.js'

dotenv.config()

const c = new Client()

const FILENAME = './media/export.xml'

c.on('ready', function() {
    console.log('Connecting to FTP ... ')
    c.get('Export.zip', function(err, stream) {
    if (err) throw err
    console.log('Done. File downloaded ')
    stream.once('close', () => { c.end(); })
    console.log('Unzip file ... ')
    stream.pipe(unzipper.ParseOne())
        .pipe(fs.createWriteStream(FILENAME))
        .on('finish', () => {
            console.log('Done. File unzipped . ')
            parseFunc(fs.readFileSync(FILENAME)
        )})
  })
})
c.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS
})