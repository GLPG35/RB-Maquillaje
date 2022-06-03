import styles from '../public/scss/home.module.scss'
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from "@react-three/drei"
import Logo from '../components/logo'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getPostFID, getPosts } from '../firebase/client'
import Product from '../components/cards/product'
import Header from '../components/layouts/header'
import Footer from '../components/layouts/footer'
import getCart from '../hooks/getCart'

const Home = () => {
    const router = useRouter()
    const [posts, setPosts] = useState(undefined)
    const [render, setRender] = useState(null)
    const [items, setItems] = useState(0)

    const handleClick = () => {
        router.replace('#catalogue')
    }

    const handleCart = (pid) => {
        const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] 

        getPostFID(pid).then((data) => {
            const exist = cartItems.find(x => x.pid == data.pid)

            if (exist) {
                const existCartItems = cartItems.map(x => x.pid == data.pid ? {...exist, quantity: exist.quantity + 1} : x)
                localStorage.setItem('cart', JSON.stringify(existCartItems))
            } else {
                data.quantity = 1
                cartItems.push(data)
                localStorage.setItem('cart', JSON.stringify(cartItems))
            }

            setItems(getCart())
        })
    }

    useEffect(() => {
        setItems(getCart())
        getPosts(setPosts)
    }, [])

    return (
        <>
            <Header items={items} current='home' />
            <div className={styles.container1}>
                <div className={styles.heroText}>
                    <h2>Maquillaje</h2>
                    <h3>y Accesorios</h3>
                    <div className={styles.wrapper}>
                        <span>A precios asequibles</span>
                        <motion.button onClick={handleClick} whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}>Ver Catálogo</motion.button>
                    </div>
                </div>
                <div className={styles.logo}>
                    {!render ?
                    <Suspense fallback={null}>
                        <Canvas gl={{antialias: true}} dpr={[0.8, 1.8]}>
                            <Logo />
                            <Environment background={false} files="/images/env2.hdr" near={1} far={1000} resolution={256} />
                        </Canvas>
                    </Suspense>
                    :
                    <img src={render} />
                    }
                </div>
            </div>
            <div className={styles.container2} id="catalogue">
                <h3>Nuevos productos</h3>
                <div className={styles.postsContainer}>
                    {posts && posts.map(({thumbnail, title, price, description, pid}) => {
                        return (
                            <Product key={pid} handleClick={handleCart} thumb={thumbnail}
                            title={title} price={price} desc={description} pid={pid} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home