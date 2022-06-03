import { useEffect, useState } from 'react'
import getCart from '../hooks/getCart'
import Header from '../components/layouts/header'
import Footer from '../components/layouts/footer'
import styles from '../public/scss/cart.module.scss'
import MercadoPagoIcon from '../components/icons/mercado_pago'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const Cart = () => {
    const [items, setItems] = useState(0)
    const [cart, setCart] = useState(undefined)
    const [total, setTotal] = useState(0)
    const router = useRouter()
    const prices = []

    const updateCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        cartItems ? setCart(cartItems) : null

        cartItems && cartItems.map(({price, quantity}) => {
            prices.push(price * quantity)
        })

        setTotal(prices.reduce((a, b) => a + b, 0))

        setItems(getCart())
    }

    useEffect(() => {
        updateCart()
    }, [])

    const addQuantity = (pid) => {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        const existCartItems = cartItems.map(x => x.pid == pid ? {...x, quantity: x.quantity + 1} : x)
        localStorage.setItem('cart', JSON.stringify(existCartItems))
        setCart(JSON.parse(localStorage.getItem('cart')))
        updateCart()
    }

    const decreaseQuantity = (pid) => {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        const existCartItems = cartItems.map(x => x.pid == pid && x.quantity > 1 ? {...x, quantity: x.quantity - 1} : x)
        localStorage.setItem('cart', JSON.stringify(existCartItems))
        setCart(JSON.parse(localStorage.getItem('cart')))
        updateCart()
    }

    const deleteItem = (pid) => {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        const indexCart = cartItems.findIndex(x => x.pid == pid)
        cartItems.splice(indexCart, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        setCart(JSON.parse(localStorage.getItem('cart')))
        updateCart()
    }

    return (
        <>
            <Header current={null} items={items} />
            <div className={styles.container1}>
                <h2>Tu carrito</h2>
                {cart && cart.length ?
                <div className={styles.subContainer1}>
                    <div className={styles.cartList}>
                        {cart &&
                            cart.map(({title, price, thumbnail, quantity, pid}) => {
                                return (
                                    <div key={pid} className={styles.cartItem}>
                                        <div className={styles.pic}>
                                            <img src={thumbnail} />
                                        </div>
                                        <div className={styles.info}>
                                            <span className={styles.title}>{title}</span>
                                            <span className={styles.price}>${price}</span>
                                            <div className={styles.quantity}>
                                                <div className={styles.wrapper}>
                                                    <button onClick={() => decreaseQuantity(pid)}>
                                                        <i className='fas fa-minus'></i>
                                                    </button>
                                                    <span>{quantity}</span>
                                                    <button onClick={() => addQuantity(pid)}>
                                                        <i className='fas fa-plus'></i>
                                                    </button>
                                                </div>
                                                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                                                className={styles.deleteItem}
                                                onClick={() => deleteItem(pid)}>
                                                    <i className='fas fa-trash'></i>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.checkout}>
                        <h3>Resumen</h3>
                        <div className={styles.checkoutList}>
                            {cart &&
                                cart.map(({title, price, quantity, pid}) => {
                                    return (
                                        <div key={pid} className={styles.info}>
                                            <div className={styles.title}>{title} x{quantity}</div>
                                            <div className={styles.price}>${price * quantity}</div>
                                        </div>
                                    )
                                })
                            }
                            <div className={styles.total}>
                                <div className={styles.result}>Total</div>
                                <div className={styles.resultPrice}>${total}</div>
                            </div>
                        </div>
                        <button>
                            <MercadoPagoIcon width='2.5em' height='2.5em' />
                            <span>Pagar con Mercado Pago</span>
                        </button>
                    </div>
                </div>
                : cart && !cart.length &&
                <div className={styles.cartEmpty}>
                    <i className='fas fa-gifts'></i>
                    <h1>¡Tu carrito está vacío!</h1>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                    onClick={() => router.push('/')}>
                        ¡Llenalo!
                    </motion.button>
                </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default Cart