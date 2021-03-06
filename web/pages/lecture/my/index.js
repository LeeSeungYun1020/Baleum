import styles from "../../../styles/Lecture.module.scss";
import MyLectureComponent from "../../../components/Lecture/MyLectureComponent";
import Layout, {siteTitle} from "../../../components/layout";
import Head from "next/head";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {CLIENT_URL, SERVER_URL} from "../../../data/global";
import axios from "axios";
import {LoginContext} from "../../_app";
import Loading from "../../../components/Loading";
import QRCode from "react-qr-code";
import {useRouter} from "next/router";
import MyCreateLectureComponent from "../../../components/Lecture/MyCreateLectureComponent";

const Lecture = () => {
    const {isLogin, id} = useContext(LoginContext)
    const [num, setNum] = useState(0); // default 0: 수강 중
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const router = useRouter();
    const clickCurrent = () => {
        setNum(0);
    } // 수강 중 강의
    const clickComplete = () => {
        setNum(1);
    } // 수강 완료 강의
    const clickMake = () => {
        setNum(2);
    }// 강의 생성
    const onMakeClick = (e) => {
        e.preventDefault();
        router.push('/lecture/my/create');
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(!isLogin) {
                    router.push('/'); // 로그인 안되어있으면 홈
                }
                if(num === 0) {
                    const response = await axios.get(`${SERVER_URL}/class/my`, {withCredentials: true});
                    // console.log(response.data)
                    setItem(response.data);
                }
                else if(num === 1) {
                    const response = await axios.get(`${SERVER_URL}/class/complete/list/${id}`, {withCredentials: true});
                    // console.log(response.data)
                    setItem(response.data);
                }
                else {
                    const response = await axios.get(`${SERVER_URL}/class/my/teach`, {withCredentials: true});
                    // console.log(response)
                    setItem(response.data);
                }
            } catch (e) {
                router.push('/'); // 오류 발생하면 걍 홈으로 가자~~~~
            }
            setLoading(false);
        }
        fetchData();
    },[num]);
    const onRemove = useCallback(
        id => {
            setItem(item.filter(item => item.id !== id))
        }, [item]
    )
    if(loading) {
        return <Loading/>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }

    const onQRClick = () => {
        router.push(`${CLIENT_URL}/certification/${id}`);
    }
    return (
        <Layout myLecture>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <div className={styles.myLecturePage}>
                <div className={styles.myLectureNav}>
                    <div className={styles.myLectureNavP} onClick={clickCurrent}><p>수강 중</p></div>
                    <div className={styles.myLectureNavP} onClick={clickComplete}><p>수강 완료</p></div>
                    <div className={styles.myLectureNavP} onClick={clickMake}><p>생성 강의</p></div>
                </div>
                    {item&&(item[0].result) ?
                        (num === 0 ? item.map((item, index) => <MyLectureComponent key={index} lecture = {item} />) : (num === 1 ?
                            <><QRCode value={`${CLIENT_URL}/certification/${id}`} style ={{marginBottom: 30, cursor: "pointer"}} onClick={onQRClick} size={100}/>
                                {item.map((item, index) => <MyLectureComponent key={index} lecture = {item} />)}
                            </> : <>
                                <button className={styles.makeButton} onClick={onMakeClick}>강의 만들기</button>
                                {item.map((item, index) => <MyCreateLectureComponent key={index} onRemove={onRemove} lecture = {item} />)}
                            </> ))
                        :
                        <div className={styles.noLectureComponent}>
                            {(num===0 ?<h3>수강 중인 강의가 존재하지 않습니다.</h3> : (num === 1 ? <><QRCode value={`${CLIENT_URL}/certification/${id}`} style ={{marginBottom: 30, cursor: "pointer"}} onClick={onQRClick} size={100}/><h3>수강 완료한 강의가 존재하지 않습니다.</h3></> : <><button className={styles.makeButton} onClick={onMakeClick}>강의 만들기</button><h3>생성한 강의가 존재하지 않습니다.</h3></>))}
                        </div>}
            </div>
            </section>
        </Layout>)
}

export default Lecture