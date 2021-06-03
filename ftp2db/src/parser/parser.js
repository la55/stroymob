import xml2js from 'xml2js'
import {getCats} from './cats.js'
import {getProducts} from './products.js'

const parseCatalog = async (xml) =>  {
    const parser = new xml2js.Parser({
        explicitArray: false,
    })
    const data = await parser.parseStringPromise(xml)
    const { cats, cat_uids } = getCats(data.yml_catalog.categories)
    const {products, filters} = getProducts(data.yml_catalog.offers, cat_uids)
    return { cats, products, filters }
} 

export default parseCatalog