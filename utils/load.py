import os
import json
import re
from urllib.request import urlretrieve
from zipfile import ZipFile
import xml.etree.ElementTree as ET


BASE_DIR = 'media'
XML_FILE = os.path.join(BASE_DIR, 'export.xml')

def from_ftp():
    dest_zip_file = os.path.join(BASE_DIR, 'from_ftp.zip')
    urlretrieve('ftp://cf54848:nVMs7ide57b6@92.53.96.246/Export.zip', dest_zip_file)
    with ZipFile(dest_zip_file, 'r') as z_file:
        z_file.extract('export.xml', path=BASE_DIR)
    os.remove(dest_zip_file)


def parse_xml(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    cat_list = root.find('categories').findall('category')
    product_list = root.find('offers').findall('offer')
    cat_id_slug = {}

    # Empty DB
    cats = []
    products = []
    stocks = []
    params = []
    filters = []
    # Check filters
    filter_set = set()

    for cat in cat_list:
        cat_id = int(cat.attrib['id'].replace('\xa0' ,''))
        cat_parent_id = int(cat.attrib['parentId'].replace('\xa0' ,''))
        slug = cat.attrib['id_1c']
        title = cat.text
        cat_id_slug[cat_id] = slug
        if cat_parent_id == 0:
            parent = 'top'
        else:
            parent = cat_id_slug[cat_parent_id]
        
        cats.append({
                 "id": slug,
                 "catId": parent,
                 "title": title,
                })


    for p in product_list:
        cat_id = int(p.find('categoryId').text.replace('\xa0' ,''))
        cat_slug = cat_id_slug[cat_id]
        product_id = p.attrib['id_1c']
        title = p.find('name').text
        vendor_code = p.find('vendorCode').text
        barcode = p.find('barcode').text
        unit = p.find('unit').text
        price = p.find('price').text.replace('\xa0' ,'').replace(',' ,'.')

        # Stock 
        total_count = 0
        for shop in p.find('shops').findall('shop'):
            count_str = shop.find('count').text
            count_string = count_str
            try:
                count_str = count_str.split(',')[0]
            except:
                pass
            count_str = ''.join(re.findall('[0-9]+', count_str))
            count = int(count_str)
            total_count += count
            shop_id = shop.attrib['id_1c']
            shop_title = shop.attrib['name']
            productshop = '{0}{1}'.format(product_id, shop_id)

            stock_dict = {
                'id' : productshop,
                'catId' : cat_slug,
                'productId' : product_id,
                'shop_id' : shop_id,
                'title' : shop_title,
                'count' : count,
                'count_str' : count_string,
                }

            stocks.append(stock_dict)

        # Params
        for param in p.findall('param'):
            try:
                name = param.attrib['name']
            except KeyError:
                continue
            value = param.text
            if value == None:
                continue
            param_id = '{0}{1}'.format(product_id, hash('{}{}'.format(name, value)))
            param_dict = {
                'id' : param_id,
                'catId' : cat_slug,
                'productId' : product_id,
                'name' : name,
                'value' : value,
                }
            params.append(param_dict)

            #filters
            filter_id = '{0}{1}'.format(cat_slug, hash('{}{}'.format(name, value)))
            filter_dict = {
                'id' : filter_id,
                'catId' : cat_slug,
                'name' : name,
                'value' : value,
            }

            if filter_id not in filter_set:
                filters.append(filter_dict)
                filter_set.add(filter_id)
                
        

        products.append({
            "id": product_id,
            "catId": cat_slug,
            "title": title,
            "vendor_code": vendor_code,
            "barcode": barcode,
            "unit": unit,
            "price": price,
            "count": str(total_count),
        })
    
    # DB
    db = {
        "cats": cats,
        "products": products,
        "stocks": stocks,
        "params": params,
        "filters": filters,
    }

    return db


def write_db(db):
        
    with open('../DB/db.json', 'w') as f:
        f.write(json.dumps(db))
    

if __name__ == '__main__':
    #from_ftp()
    db = parse_xml(XML_FILE)
    write_db(db)
    print('Created DB/db.json')
    
