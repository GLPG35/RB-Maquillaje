const getCart = () => {
    let cart = 0

    const cartItems = localStorage.getItem('cart')
    cart = cartItems ? (JSON.parse(cartItems).length <= 99 ? JSON.parse(cartItems).length : '+99') : 0

    return cart
}

export default getCart