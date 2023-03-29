import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>0x Social Wallet</title>
        <meta name="description" content="Send/Recieve crypto assets with social accounts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Ox Socail Wallet
          </p>
          <div>
            By OxGoodMorning
          </div>
        </div>

        <div className={styles.center}>
          <p className={inter.className}>
            Tabs Send/Recive here
          </p>
        </div>

      </main>
    </>
  )
}
