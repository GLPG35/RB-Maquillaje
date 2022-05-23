import Head from 'next/head'

const Main = ({ children }) => {
    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>RB Maquillaje</title>
                <link rel="icon" href="/images/RB_Maquillaje_icon.png" />
            </Head>
            {children}
        </>
    )
}

export default Main