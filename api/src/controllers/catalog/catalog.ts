import { Request, Response } from 'express'
import Cat from '../../models/cat'

const catalog = async (req: Request, res: Response) => {
    try {
        const cats = await Cat.find({parent_uid: 'top'})
        return res.json(cats)
    } catch (err) {
        console.log(err)
    }
}

export default catalog