import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import LectureNav from "../../../../components/Lecture/LectureNav";
import styles from "../../../../styles/Lecture.module.scss";
import {ROUTE_NOTICE_ID, SERVER_URL} from "../../../../data/global";
import LectureTopNav from "../../../../components/Lecture/LectureTopNav";
import Link from "next/link";
import {LoginContext} from "../../../_app";

const notice = () => {
    const router = useRouter()
    const {currentUserId} = useContext(LoginContext);
    const {id} = router.query ;// 경로 /lecture/[id]/notice/[noticeId]
    if (!id) {
        return <></>
    }
    const [lecture, setLecture] = useState();
    const [notice, setNotice] = useState();
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const [noticeExist, setNoticeExist] = useState(false); // 공지 없으면 F
    const [userId, setUserId] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response1 = await axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
                if(response1.data[0].result) {
                    setLecture(response1.data[0])
                    setUserId(response1.data[0].userId)
                }
                else {
                    router.push('/')
                }
                const response2 = await axios.get(`${SERVER_URL}/class/notice/class/${id}`, {withCredentials: true});
                console.log(response2);
                if(response2.data[0].result){
                    setNotice(response2.data);
                    setNoticeExist(true);
                }
                else {
                    setNotice(true);
                    setNoticeExist(false);
                }
            } catch (e) {
                router.push('/');
            }
            setLoading(false);
        }
        fetchData();
    },[])
    if(loading) {
        return (
            <></>
        )
    }
    return (
        <>
            <LectureTopNav />
            <div className={styles.lecturePage}>
                <LectureNav lecture = {lecture} id={id} />
                {/*{content && console.log(content.url)}*/}
                   <div className={styles.lectureNoticePage}>
                       <h1 className={styles.lectureTitle}>강의 공지</h1>
                       {notice &&
                       (noticeExist ?
                                   <div className={styles.lectureNoticeDiv}> {notice.map((list, index) => <Link key={index} href={{
                               pathname: ROUTE_NOTICE_ID,
                               query: { id: id, noticeId: list.id}
                                   }}><a>{index + 1} {list.title}</a></Link>)}</div> : <p className={styles.lectureNoNotice}>등록된 공지사항이 없습니다.</p>)
                       }
                       {userId === currentUserId && <button className={styles.noticeButton}><Link href={`/lecture/${id}/notice/write`}><a>작성</a></Link></button>}
                   </div>
            </div>
        </>)
}

export default notice