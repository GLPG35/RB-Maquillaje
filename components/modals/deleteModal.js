import Backdrop from '../backdrops/backdrop'
import { motion } from 'framer-motion'
import styles from '../../public/scss/delete_modal.module.scss'
import { useState } from 'react'
import Spinner from '../spinners/spinner'

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: '100vh',
        opacity: 0
    }
}

const DeleteModal = ({handleClose, handleDelete, pid}) => {
    const [process, setProcess] = useState(false)

    return (
        <Backdrop onClick={handleClose}>
            {process && <Spinner />}
            <motion.div variants={dropIn} initial='hidden' animate='visible'
            exit='exit' className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>¿Segura que deseas borrar esta publicación?</h2>
                <div className={styles.btns}>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                    onClick={() => {handleDelete(pid), setProcess(true)}}>
                        Sí <i className='fas fa-check'></i>
                    </motion.button>
                    <motion.div className={styles.button} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <button onClick={handleClose}>
                            No <i className='fas fa-times'></i>
                        </button>
                        <div className={styles.buttonBack}></div>
                    </motion.div>
                </div>
            </motion.div>
        </Backdrop>
    )
}

export default DeleteModal