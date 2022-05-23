import styles from '../../public/scss/backdrop.module.scss'
import { motion } from "framer-motion"

const Backdrop = ({ children, onClick }) => {
    return (
        <motion.div className={styles.backdrop}
        initial={{opacity: 0}} animate={{opacity: 1}}
        exit={{opacity: 0}} onClick={onClick}>
            {children}
        </motion.div>
    )
}

export default Backdrop