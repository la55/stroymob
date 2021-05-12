import { Request, Response } from 'express'
import Cat from '../models/cat'

const catDetail = async (req: Request, res: Response) => {
    try {
        const cat = await Cat.findOne({uid: req.params.uid})
        const cats = await Cat.find({parent_uid: req.params.uid})
        const cat_with_sub = { cat, cats }
        return res.json(cat_with_sub)
    } catch (err) {
        console.log(err)
    }
}

export default catDetail
