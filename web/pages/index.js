import Head from 'next/head'
import Layout, {siteTitle} from "../components/layout"
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import HomeLectureList from "../components/Home/HomeLectureList"
import SignInBox from "../components/Users/SignInBox"
import SignOutBox from "../components/Users/SignOutBox";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "./_app";
import {SERVER_URL} from "../data/global";
import axios from "axios";
import Loading from "../components/Loading";


export default function Home() {
    const {isLogin} = useContext(LoginContext)
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/class/main`,{ withCredentials: true });
                // console.log(response)
                setItem(response.data);
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // 대기 중일 때
    if(loading) {
        return <Loading/>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <div className={styles.banner}>
                    <Image src="/img/banner.png" alt="배너" width={804} height={240}/>
                    {isLogin ? <SignOutBox/> : <SignInBox/>}
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
                    <HomeLectureList lectureList={item}/>
                </div>
            </section>
        </Layout>
    )
}
