import Router from 'express'
import catalog from './controllers/catalog'
import catDetail from './controllers/cat_detail'
import productDetail from './controllers/product_detail'
import productsByCat from './controllers/products_by_cat'
import home from './controllers/home'

const router = Router()

router.route('/api1/catalog').get(catalog)
router.route('/api1/cats/:uid').get(catDetail)
router.route('/api1/catalog/:cat_uid').get(productsByCat)
router.route('/api1/products/:uid').get(productDetail)
router.route('/api1').get(home)

export default router