import styles from '../../public/scss/footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <span>&copy; RB Maquillaje</span>
            <div className={styles.social}>
                <a href="https://www.instagram.com/rbmaquillajeuruguay/" target='_blank' rel='noopener noreferrer'>
                    <i className='fab fa-instagram'></i>
                </a>
            </div>
        </div>
    )
}

export default Footer