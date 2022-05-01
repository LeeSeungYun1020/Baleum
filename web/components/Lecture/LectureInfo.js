import styles from "../../styles/Lecture.module.scss"
import Loading from "../Loading";
import LectureListComponent from "./LectureListComponent";
import BlockList from "./BlockList";
import axios from "axios";
import {SERVER_URL, ROUTE_NOTICE_LIST_ID} from "../../data/global";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

const LectureInfo = ({lecture}) => {
    if(!lecture) {
        return (
            <Loading />
        )
    }
    const router = useRouter();
    const [isBefore, setIsBefore] = useState(true); // 수강신청 하기 전 강의인지 true이면 수강신청 안한거
    const [notice, setNotice] = useState(); // 강의 공지
    const [noticeExist, setNoticeExist] = useState(false); // 공지 없으면 F
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const onClick = () => {
        axios.post(`${SERVER_URL}/class/enrol/${lecture.id}`, {}, {withCredentials: true})
            .then(response => {
                if(response.data.result) {
                    alert("수강신청이 완료되었습니다.");
                    setIsBefore(false);
                }
                else {
                    alert("수강신청이 실패하였습니다. 다시 시도해주세요.");
                }
                // console.log(response)
            })
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response1 = await axios.get(`${SERVER_URL}/class/isBefore/${lecture.id}`, {withCredentials: true})
                if (response1.data.result) {
                    setIsBefore(true);
                } else {
                    setIsBefore(false);
                }
                const response2 = await axios.get(`${SERVER_URL}/class/notice/class/${lecture.id}`, {withCredentials: true});
                console.log(response2);
                if(response2.data[0].result){
                    setNotice(response2.data);
                    setNoticeExist(true);
                }
                else {
                    setNoticeExist(false);
                }
            } catch (e) {
                router.push("/");
            }
            setLoading(false);
        }
        fetchData();
    },[])
    if(loading) {
        return <></>
    }
    return (
        <div className={styles.lectureInfo}>
            <h1 className={styles.lectureTitle}>{lecture.name}</h1>
            {isBefore && <button className={styles.lectureRegisterBtn} onClick={onClick}>수강 신청</button>}
            <h2 className={styles.lectureAuthor}>{lecture.teacher}</h2>
            <div className={styles.lectureDescribe}>
                <h3>강의 요약</h3>
                <p>{lecture.detail}</p>
            </div>
            <div className={styles.lectureNotice}>
                <h3>강의 공지</h3>
                <div className={styles.lectureNoticeSpace}>{noticeExist ? notice.map((list, index) => <Link key={index} href={{
                    pathname: ROUTE_NOTICE_LIST_ID,
                    query: { classId: list.classId, noticeId: list.id}
                }}><a>{list.id} {list.title}</a></Link>) : <p>등록된 공지사항이 없습니다.</p>}</div>
            </div>
            <h3>내 진행 블록</h3>
            <div className={styles.lectureBlock}>
                <BlockList classId={lecture.id}/></div>
            <ul className={styles.lectureInfoList}>
                {/*{console.log(isBefore)}*/}
                <h2>강의 목록</h2>
                <LectureListComponent lecture={lecture} isBefore={isBefore}/>
            </ul>
        </div>
    )
}

export default LectureInfo