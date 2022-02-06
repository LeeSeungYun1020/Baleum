import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout";
// import sampleImage from '../public/img/sample-banner.jpg';
import Image from 'next/image'
import styles from '../styles/Home.module.scss';
import HomeLectureList from "../components/HomeLectureList";

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <div className={styles.banner}>
                   <Image src="/img/sample-banner.jpg" alt="배너" width={804} height={240} />
                    <div>
                        <h1> 로그인 컴포넌트!</h1>
                    </div>
                </div>
                {/*여기는 공지사항, ... 네비게이션 영역*/}
                <nav className={styles.subNav}>
                    <ul>
                        <li><a>공지사항</a></li>
                        <li><a>소개 페이지</a></li>
                        <li><a>사용 방법</a></li>
                    </ul>
                </nav>
                <div>
                    <h1>강의 목록</h1>
                    <HomeLectureList/>
                </div>
            </section>
        </Layout>
    )
}
