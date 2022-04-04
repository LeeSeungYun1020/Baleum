import styles from "../../../styles/Lecture.module.scss";
import MyLectureComponent from "../../../components/Lecture/MyLectureComponent";
import Layout, {siteTitle} from "../../../components/layout";
import Head from "next/head";
import React, {useContext, useEffect, useState} from "react";
import {SERVER_URL} from "../../../data/global";
import axios from "axios";
import {LoginContext} from "../../_app";
import Loading from "../../../components/Loading";

const Lecture = () => {
    const {id} = useContext(LoginContext)
    const [num, setNum] = useState(0); // default 0: 수강 중
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const clickCurrent = () => {
        setNum(0);
    } // 수강 중 강의
    const clickComplete = () => {
        setNum(1);
    } // 수강 완료 강의
    const clickMake = () => {
        setNum(2);
    }// 강의 생성
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(num === 0) {
                    const response = await axios.get(`${SERVER_URL}/class/my`, {withCredentials: true});
                    console.log(response.data)
                    setItem(response.data);
                }
                else if(num === 1) {
                    const response = await axios.get(`${SERVER_URL}/class/complete/list/${id}`, {withCredentials: true});
                    // console.log(response)
                    setItem(response.data);
                }
                else {
                    const response = await axios.get(`${SERVER_URL}/class/my/${id}`, {withCredentials: true});
                    console.log(response)
                    setItem(response.data);
                }
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[num]);

    if(loading) {
        return <Loading/>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
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
                    {(num !== 2 && item[0].result) ? item.map((item, index) => <MyLectureComponent key={index} lecture = {item} />) :
                        <div className={styles.noLectureComponent}>
                            {(num===0 ?<h3>수강 중인 강의가 존재하지 않습니다.</h3> : (num === 1 ? <h3>수강 완료한 강의가 존재하지 않습니다.</h3> : <h3>생성한 강의가 존재하지 않습니다.</h3>))}
                        </div>}
            </div>
            </section>
        </Layout>)
}

export default Lecture