import unzipper from 'unzipper'
import fs from 'fs'

const extractXML = async (MEDIA_DIR, ZIP_FILE, XML_FILE) => {
    return new Promise( (resolve, reject) => {
        fs.createReadStream(MEDIA_DIR + ZIP_FILE)
        .pipe(unzipper.ParseOne())
        .pipe(fs.createWriteStream(MEDIA_DIR + XML_FILE))
        .on('error',reject)
        .on('finish',resolve)
    })
}

export default extractXML