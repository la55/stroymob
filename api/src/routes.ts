import Router from 'express'
import catalog from './controllers/catalog'

const router = Router()

router.route('/api1/catalog').get(catalog)
router.route('/api1').get((req, res) => {
    return res.json('API')
})

export default router