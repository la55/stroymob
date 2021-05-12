import { Request, Response } from 'express'
import Cat from '../models/cat'

const catDetail = async (req: Request, res: Response) => {
    try {
        const cat = await Cat.findOne({uid: req.params.uid})
        return res.json(cat)
    } catch (err) {
        console.log(err)
    }
}

export default catDetail