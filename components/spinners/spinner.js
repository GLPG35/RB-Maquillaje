import styles from '../../public/scss/spinner.module.scss'
import { motion } from 'framer-motion'

const Spinner = () => {
    return (
        <>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
            transition={{duration: 0.2}} className={styles.spinnerContainer}>
                <div className={styles.spinner}>
                </div>
            </motion.div>
        </>
    )   
}

export default Spinner