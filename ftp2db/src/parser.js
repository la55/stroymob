import xml2js from 'xml2js'
import {getCats} from './catalog.js'


export const parseFunc = async (xml) =>  {
    console.log('Parsing file ...')
    const parser = new xml2js.Parser({
        explicitArray: false,
    })
    const data = await parser.parseStringPromise(xml)
    console.log(data.yml_catalog.$.date)
    console.log(data)
    const cats = getCats(data.yml_catalog.categories)
} 