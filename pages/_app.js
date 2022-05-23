import Layout from '../components/layouts/main'
import '../public/scss/global.scss'
import '../public/fontawesome/css/all.css'

const Website = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default Website