import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from '../../public/scss/preview_product.module.scss'

const PreviewProduct = ({ thumb, title, price, desc }) => {
    const [info, setInfo] = useState(false)

    return (
        <div className={styles.card}>
            <div className={!info ? styles.dInfo : styles.dInfoActive}>
                <i className='fas fa-info-circle' onClick={() => {info ? setInfo(false) : setInfo(true)}}></i>
                <span>{desc ? desc : 'No hay descripción de este producto'}</span>
            </div>
            <div className={styles.thumbnail}>
                <img src={thumb ? URL.createObjectURL(thumb) : '/images/image_ph.webp'} />
            </div>
            <div className={styles.bInfo}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        {title ? title : 'Título'}
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

export default PreviewProduct