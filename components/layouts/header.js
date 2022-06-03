import styles from '../../public/scss/header.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const btnVar = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
}

const ctrVar = {
    hover: { scale: 0.9 },
    tap: { scale: 1.1 }
}

const Header = ({ items, current }) => {
    const [toggle, setToggle] = useState(false)
    const router = useRouter()

    return (
        <div className={styles.header}>
            <div className={styles.icon} onClick={() => toggle ? setToggle(false) : setToggle(true)}>
                <i className='fas fa-crown'></i>
            </div>
            <ul className={toggle ? styles.active : undefined} >
                <li>
                    <Link href={'/'}>
                        <a className={current == 'home' ? styles.current : undefined}>Inicio</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/productos'}>
                        <a>Maquillaje</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/idk'}>
                        <a>Accesorios</a>
                    </Link>
                </li>
            </ul>
            <motion.div className={styles.cart} variants={btnVar} whileHover='hover'
            whileTap='tap' onClick={() => router.push('/cart')}>
                <i className='fas fa-shopping-cart'></i>
                <motion.div className={styles.counter} variants={ctrVar}>
                    {items && items}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Header