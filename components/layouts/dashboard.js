import styles from '../../public/scss/dashboard_layout.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { logOut } from '../../firebase/client'
import { useRouter } from 'next/router'

const DashboardLayout = ({ children, user, current }) => {
    const [active, setActive] = useState(false)
    const [resp, setResp] = useState(false)
    const router = useRouter()

    const handleSignOut = () => {
        logOut()
        router.replace('/login')
    }

    const handleResize = () => {
        window.innerWidth <= 500 ? setResp(true) : setResp(false)
    }

    useEffect(() => {
        window.innerWidth <= 500 && setResp(true)
        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div className={styles.container1}>
                <div className={styles.nav}>
                    <div className={styles.profile}>
                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                        onClick={() => active ? setActive(false) : setActive(true)} className={styles.pic}>
                            <img src={user ? user.photoURL : '/images/avatar_ph.webp'} />
                        </motion.div>
                        {!resp && <span>{user && user.displayName}</span>}
                    </div>
                    <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
                        {active &&
                        <motion.div className={styles.popup}
                        initial={{opacity: 0, scaleX: 0}}
                        animate={{opacity: 1, scaleX: 1, originX: 0}}
                        exit={{opacity: 0, scaleX: 0}}>
                            <button onClick={handleSignOut}>
                                Cerrar Sesión <i className='fas fa-sign-out'></i>
                            </button>
                        </motion.div>}
                    </AnimatePresence>
                    <div className={styles.list}>
                        <Link href={'/dashboard'}>
                            <a className={current == 'index' ? styles.current : undefined}>
                                <i className='fas fa-eye'></i>{!resp && ' Ver'}
                            </a>
                        </Link>
                        <Link href={'/dashboard/create'}>
                            <a className={current == 'create' ? styles.current : undefined}>
                                <i className='fas fa-plus-circle'></i>{!resp && ' Crear'}
                            </a>
                        </Link>
                        <Link href={'/dashboard/delete'}>
                            <a className={current == 'delete' ? styles.current : undefined}>
                                <i className='fas fa-trash'></i>{!resp && ' Eliminar'}
                            </a>
                        </Link>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}

export default DashboardLayout