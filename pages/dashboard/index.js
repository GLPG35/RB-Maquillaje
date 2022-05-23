import useUser from '../../hooks/useUser'
import styles from '../../public/scss/dashboard.module.scss'
import DashboardLayout from '../../components/layouts/dashboard'
import { useEffect, useState } from 'react'
import Spinner from '../../components/spinners/spinner'
import { motion, AnimatePresence } from 'framer-motion'
import { getPostFID, getPosts } from '../../firebase/client'
import PostModal from '../../components/modals/postModal'

const Dashboard = () => {
    const user = useUser()
    const [posts, setPosts] = useState(undefined)
    const [view, setView] = useState(null)

    useEffect(() => {
        getPosts(setPosts)
    }, [])
    
    const viewPost = (pid) => {
        getPostFID(pid).then(setView)
    }

    return (
        <DashboardLayout user={user} current='index'>
            {posts === undefined && <Spinner />}
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {view && <PostModal handleClose={() => setView(null)} thumbnail={view.thumbnail}
                title={view.title} price={view.price} description={view.description && view.description}
                pid={view.pid} />}
            </AnimatePresence>
            <div className={styles.dashboard}>
                <h1>Dashboard</h1>
                <div className={styles.postsContainer}>
                    {posts && posts.map(({thumbnail, pid}) => {
                        return (
                            <AnimatePresence key={pid} exitBeforeEnter={true}>
                                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}
                                className={styles.post} onClick={() => viewPost(pid)}>
                                    <div className={styles.pic}>
                                        <motion.img initial={{opacity: 0}} animate={{opacity: 1}}
                                        src={thumbnail} draggable='false' />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )
                    })}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard