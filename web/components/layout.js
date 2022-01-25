import Head from 'next/head'
import styles from '../styles/layout.module.scss'
import Link from 'next/link'
import classNames from 'classnames/bind';
import Image from "next/image";

export const siteTitle = "바름"

export default function Layout({ children }) {
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
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet" />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={classNames({[styles.header]: true, [styles.inner]: true})}>
                <div className={styles.nameTab}>
                    <Link href="/">
                        <a className={styles.logo}>
                            바름
                        </a>
                    </Link>
                    <div>
                        <Link href="/"><a>내 강의</a></Link>
                        <span className={`material-icons ${styles.userIcon}`}>account_circle</span>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navTab}><Link href="/"><a>과정</a></Link></li>
                        <li className={styles.navTab}><Link href="/"><a>강의</a></Link></li>
                    </ul>
                </nav>
            </header>
            <main className={styles.inner}>{children}</main>
            <footer className={classNames({[styles.footer]: true, [styles.inner]: true})}>
                바름: 블록체인 기반 인증 학습 경험 사용자 지원 플랫폼
            </footer>
        </div>
    )
}