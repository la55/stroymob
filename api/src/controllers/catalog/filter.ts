import { Request, Response } from 'express'
import Filter from '../../models/filter'

const paramsByCat = async (req: Request, res: Response) => {
    try {
        const params = await Filter.findOne({cat_uid: req.params.cat_uid})
        return res.json(params)
    } catch (err) {
        console.log(err)
    }
}

export default paramsByCat