import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/dashboard'
import Spinner from '../../components/spinners/spinner'
import { deletePost, getPosts } from '../../firebase/client'
import useUser from '../../hooks/useUser'
import styles from '../../public/scss/delete.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import DeleteModal from '../../components/modals/deleteModal'

const Delete = () => {
    const user = useUser()
    const [posts, setPosts] = useState(undefined)
    const [del, setDel] = useState(null)

    useEffect(() => {
        getPosts(setPosts)
    }, [])

    const delPost = (pid) => {
        deletePost(pid).then(() => {
            setDel(null)
        })
    }

    const contAnim = {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren"
            }
        }
    }

    const childAnim = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    return (
        <DashboardLayout user={user} current='delete'>
            {posts === undefined && <Spinner />}
            <AnimatePresence>
                {del && <DeleteModal handleClose={() => setDel(null)} pid={del} handleDelete={delPost} />}
            </AnimatePresence>
            <div className={styles.delete}>
                <h1>Eliminar Posts</h1>
                <motion.div variants={contAnim} initial='hidden' animate='visible' className={styles.postsContainer}>
                        {posts && posts.map(({thumbnail, title, price, pid}) => {
                            return (
                                <AnimatePresence onExitComplete={() => null} exitBeforeEnter={true}>
                                    <motion.div variants={childAnim} key={pid} className={styles.post}>
                                        <div className={styles.pic}>
                                            <img src={thumbnail} draggable='false' />
                                        </div>
                                        <div className={styles.info}>
                                            <span>{title}</span>
                                            <span>${price}</span>
                                        </div>
                                        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                                        onClick={() => setDel(pid)}>
                                            <i className='fas fa-trash'></i>
                                        </motion.button>
                                    </motion.div>
                                </AnimatePresence>
                            )
                        })}
                </motion.div>
            </div>
        </DashboardLayout>
    )
}

export default Delete