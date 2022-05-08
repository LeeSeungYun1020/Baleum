import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import LectureNav from "../../../../../components/Lecture/LectureNav";
import styles from "../../../../../styles/Lecture.module.scss";
import {SERVER_URL} from "../../../../../data/global";
import LectureTopNav from "../../../../../components/Lecture/LectureTopNav";
import {LoginContext} from "../../../../_app";
import Link from "next/link"
const notice = () => {
    const router = useRouter()
    const {id, noticeId} = router.query ; // 경로 /lecture/[id]/notice/[noticeId]
    if (!noticeId) {
        return <></>
    }
    const [lecture, setLecture] = useState();
    const [notice, setNotice] = useState();
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const {currentUserId} = useContext(LoginContext)
    const deleteClick = e => {
        e.preventDefault();
        if(window.confirm("공지사항을 삭제하시겠습니까?")) {
            axios.delete(`${SERVER_URL}/class/notice/delete/${notice[noticeId-1].id}`, {withCredentials: true})
                .then(response => {
                    console.log(response)
                    if (response.data.result) {
                        alert("공지사항이 삭제되었습니다.")
                    } else {
                        alert("잠시후 다시 시도해주세요.")
                    }
                })
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response1 = await axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
                console.log(response1)
                if(response1.data[0].result) {
                     setLecture(response1.data[0])
                 }
                 else {
                     router.push('/')
                }
                const response2 = await axios.get(`${SERVER_URL}/class/notice/class/${id}`, {withCredentials: true});
                console.log(response2);
                if(response2.data[0].result){
                    setNotice(response2.data);
                }
                // else {
                //     router.push('/')
                // }
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
                {notice &&
                (notice[noticeId-1] ? <div className={styles.lectureNoticePage}>
                            <h1 className={styles.lectureTitle}>강의 공지</h1>
                            <div className={styles.lectureNoticeDiv}>
                                <h2>{notice[noticeId-1].title}</h2>
                                <h3>작성일자: {notice[noticeId-1].date.split('T')[0]}</h3>
                                <h3 className={styles.lectureNoticeContent}>{notice[noticeId-1].contents}</h3>
                                {(currentUserId===notice[noticeId-1].userId) && <div><button><Link href={{
                                    pathname: `/lecture/[id]/notice/update/[noticeUpdateId]`,
                                    query: { id: id, noticeUpdateId: JSON.stringify(notice[noticeId-1])}
                                }}><a>수정</a></Link></button><button onClick={deleteClick}>삭제</button></div>}
                            </div>
                </div> :
                    <></>
                )}
            </div>
        </>)
}

export default notice