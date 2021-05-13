import { Request, Response } from 'express'
import Cat from '../../models/cat'


const searchCats = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.query.title ) {
        return res.status(400).json('Missing query param title')
    }
    const full = req.query.full ? '' : '^'
    const title = new RegExp(full + req.query.title.toString(), 'i') 
    
    try {
        const cats = await Cat.find({
            title,
        }).sort(`${title}`)
        return res.json(cats)
    } catch (err) {
        console.log(err)
    }
}

export default searchCats