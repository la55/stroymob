import { useState } from 'react'
import styles from './ProductDetail.module.scss'
import Params from './Params'
import Stocks from './Stocks'

const ProductDetail = ({ product }) => {
    const [image, setImage] = useState(`https://stroitel55.com/media/productphoto/${product.id}.jpg`)
    return (
        <div>
              <div  className={styles.card}>
                <div className={styles.image}>
                <img
                    src={image}
                    onError={() => setImage('/static/svg/loading.gif')}
                    alt={ product.title }
                />
                </div>
                <div className={styles.info}>
                    <div className={styles.pay}>
                        <div className={styles.buy}>
                            <input type="number" />
                            <button>
                                В корзину
                            </button>
                        </div>
                        <div className={styles.price}>
                           {product.price} руб.
                        </div>
                    </div>
                    <div className={styles.code}>
                        <div>
                            Арт. { product.vendor_code }
                        </div>
                        <div>
                            Штр. { product.barcode }
                        </div>
                    </div>
                    <div className={styles.title}>
                        { product.title }
                    </div>
                    <div className={styles.params}>
                        <Params params={ product.params }/>
                    </div>
                    <div className={styles.stocks}>
                        <Stocks stocks={ product.stocks }/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail