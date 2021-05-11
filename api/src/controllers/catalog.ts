import { Request, Response } from 'express'
import Cat from '../models/cat'

const catalog = async (req: Request, res: Response) => {
    try {
        const cats = await Cat.find({parent_uid: 'top'})
        const top_catalog = cats.map((cat: any)  => ({
            uid: cat.uid,
            title: cat.title
        }))
        return res.json(top_catalog)
    } catch (err) {
        console.log(err)
    }
}

export default catalog