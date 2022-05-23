import styles from '../public/scss/login.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { login } from '../firebase/client'
import useUser from '../hooks/useUser'
import { useRouter } from 'next/router'
import Spinner from '../components/spinners/spinner'

const Login = () => {
    const [mail, setMail] = useState(false)
    const [iMail, setIMail] = useState(false)
    const [iPass, setIPass] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const router = useRouter()
    const user = useUser()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const email = e.target.email.value
        const pass = e.target.password.value

        login(email, pass)
        .then(() => {
            setSpinner(true)
        })
        .catch((err) => {
            const errCode = err.code

            switch (errCode) {
                case 'auth/invalid-email':
                case 'auth/user-not-found':
                case 'auth/internal-error':
                    setIMail(true)
                    break;
            
                case 'auth/wrong-password':
                    setIPass(true)
                    break;
            }
        })
    }

    const handleClick = () => {
        if (!mail) {
            setMail(true)

            setTimeout(() => {
                setMail(false)
            }, 5000)
        }
    }

    useEffect(() => {
        user && router.replace('/dashboard')
    }, [user])

    return (
        <>
            <div className={styles.container1}>
                {spinner && <Spinner />}
                <form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <div className={styles.fields}>
                        <div className={styles.wrapper}>
                            <input id='email' className={iMail && styles.emailIncorrect} type='text'
                            name='email' placeholder='E-Mail' required onChange={() => {iMail && setIMail(false)}} />
                            <i className='fas fa-times' style={iMail ? {opacity: 1} : {}}></i>
                        </div>
                        <div className={styles.wrapper}>
                            <input className={iPass && styles.passIncorrect} type='password'
                            name='password' placeholder='Contraseña' required onChange={() => {iPass && setIPass(false)}} />
                            <i className='fas fa-times' style={iPass ? {opacity: 1} : {}}></i>
                        </div>
                        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                        transition={{duration: 0.2}} type='submit'>
                            Entrar <i className='fas fa-lock'></i>
                        </motion.button>
                    </div>
                    <motion.span className={styles.forgotten} whileTap={{scale: 0.95}}
                    onClick={handleClick}>
                        ¿Olvidaste tu contraseña?
                        <AnimatePresence>
                            {mail && <motion.span initial={{opacity: 0}}
                            animate={{opacity: 1}} exit={{opacity: 0}}>
                                Preguntale a Gian <i className='fas fa-heart'></i>
                            </motion.span>}
                        </AnimatePresence>
                    </motion.span>
                </form>
            </div>
        </>
    )
}

export default Login