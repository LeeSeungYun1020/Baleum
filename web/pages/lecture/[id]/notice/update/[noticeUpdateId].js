import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../_app";
import {useRouter} from "next/router";
import axios from "axios";
import {SERVER_URL} from "../../../../../data/global";
import LectureNav from "../../../../../components/Lecture/LectureNav";
import styles from "../../../../../styles/Lecture.module.scss";
import LectureTopNav from "../../../../../components/Lecture/LectureTopNav";

const update = () => {
    const router = useRouter();
    const {id, noticeUpdateId} = router.query;
    if(!id || !noticeUpdateId) {
        return <></>
    }
    const notice = JSON.parse(noticeUpdateId)
    const {currentUserId} = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [lecture, setLecture] = useState();
    const [title, setTitle] = useState(notice.title);
    const [contents, setContents] = useState(notice.contents);
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/class/notice/update/${notice.id}`, {
            title: title,
            contents: contents
        }, {withCredentials: true})
            .then (
                response => {
                    console.log(response);
                    if(response.data) {
                        alert("공지사항이 수정되었습니다.");
                        router.push(`/lecture/${id}/notice/${notice.id}`)
                    }
                    else {
                        alert("잠시후 다시 시도해주세요.");
                    }
                }
            )
    }
    const titleChange = e => {
        setTitle(e.target.value);
    }
    const contentsChange = e => {
        setContents(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
                if(response.data[0].result) {
                    setLecture(response.data[0])
                }
                else {
                    router.push('/')
                }
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, [])
    if(lecture && lecture.userId !== currentUserId) {
        router.push("/");
    }
    if(loading) {
        return (
            <></>
        )
    }
    return (
        <>
            <LectureTopNav />
            <div className={styles.lecturePage}>
                <LectureNav lecture = {lecture} id = {id}/>
                <div className={styles.lectureNoticePage}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.noticeUpdateInput}>
                            <input type={"text"} id={"title"} name={"title"} required onChange={titleChange} placeholder={"제목"} value={title}/>
                        </div>
                        <div className={styles.noticeUpdateInput}>
                            <textarea id={"contents"} name={"contents"} required onChange={contentsChange} placeholder={"내용"} value={contents}/>
                        </div>
                        <div className={styles.noticeUpdateSubmit}>
                            <input className={styles.noticeButton} type={"submit"} value={"완료"}/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default update;