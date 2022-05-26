import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from '../../public/scss/product.module.scss'

const Product = ({thumb, title, price, desc = null, pid}) => {
    const [info, setInfo] = useState(false)

    return (
        <div className={styles.card}>
            <div className={!info ? styles.dInfo : styles.dInfoActive}>
                <i className='fas fa-info-circle' onClick={() => {info ? setInfo(false) : setInfo(true)}}></i>
                <span>{desc ? desc : 'No hay descripción de este producto'}</span>
            </div>
            <div className={styles.thumbnail}>
                <img src={thumb ? thumb : '/images/image_ph.webp'} loading='lazy' />
            </div>
            <div className={styles.bInfo}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <span>{title ? title : 'Título'}</span>
                        <span>{title ? title : 'Título'}</span>
                    </div>
                    <div className={styles.price}>
                        {price ? '$' + price : '$0'}
                    </div>
                </div>
                <div className={styles.cart}>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <i className='fas fa-shopping-cart'></i>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Product