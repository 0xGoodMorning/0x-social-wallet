import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Layout.module.css'
const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>0x Social Wallet</title>
                <meta
                    name="description"
                    content="Send/Recieve crypto assets with social accounts"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.description}>
                    <p>Ox Socail Wallet</p>
                    <div>By OxGoodMorning</div>
                </div>

                <div className={styles.center}>
                    {/* TODO remove the p */}
                    <p className={inter.className}>Tabs Send/Recive here</p>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
