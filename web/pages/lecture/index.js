import styles from "../../styles/Lecture.module.scss";
import {dummyLecture} from "../../data/dummyLecture";
import MyLectureComponent from "../../components/Lecture/MyLectureComponent";
import Layout, {siteTitle} from "../../components/layout";
import Head from "next/head";
import React from "react";

const Lecture = () => {
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    return (
        <Layout myLecture>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <div className={styles.myLecturePage}>
                <div className={styles.myLectureNav}>
                    <div className={styles.myLectureNavP}><p>수강 중</p></div>
                    <div className={styles.myLectureNavP}><p>수강 완료</p></div>
                    <div className={styles.myLectureNavP}><p>생성 강의</p></div>
                </div>
                {dummyLecture.map((list, index) => <MyLectureComponent key={index} lecture = {list}/>)}
            </div>
            </section>
        </Layout>)
}

export default Lecture