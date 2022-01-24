import Head from 'next/head'
import styles from '../styles/layout.module.scss'
import Link from 'next/link'

export const siteTitle = "바름"

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>바름</title>
                <meta name="description"
                      content="Baleum: Blockchain Authentication Learning Experience User Management platform"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png"/>
                <link rel="manifest" href="/icon/site.webmanifest"/>
                <link rel="icon" href="/icon/favicon.ico"/>
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {/*TODO("header 구현")*/}
            </header>
            <main>{children}</main>
            <footer className={styles.footer}>
                {/*TODO("footer 구현")*/}
            </footer>
        </div>
    )
}