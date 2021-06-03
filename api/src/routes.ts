import Router from 'express'
import catalog from './controllers/catalog/catalog'
import catDetail from './controllers/catalog/cat_detail'
import productDetail from './controllers/catalog/product_detail'
import paramsByCat from './controllers/catalog/filter'
import searchCats from './controllers/search/search_cats'
import searchProducts from './controllers/search/search_products'
import home from './controllers/home'

const router = Router()

router.route('/api1/catalog').get(catalog)
router.route('/api1/cats/:uid').get(catDetail)
router.route('/api1/products/:uid').get(productDetail)
router.route('/api1/filters/:cat_uid').get(paramsByCat)

router.route('/api1/cats').get(searchCats)
router.route('/api1/products').post(searchProducts)
router.route('/api1/products').get(searchProducts)

router.route('/api1').get(home)

export default router