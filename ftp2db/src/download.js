import fs from 'fs'
import ftp from 'basic-ftp'

async function downloadZip(MEDIA_DIR, ZIP_FILE) {
    const client = new ftp.Client()
    client.ftp.verbose = false
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: false
        })
        //console.log(await client.list())
        await client.downloadTo(fs.createWriteStream(MEDIA_DIR + ZIP_FILE), ZIP_FILE)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

export default downloadZip