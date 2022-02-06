import {useRouter} from "next/router";
import LectureNav from "../../../components/Lecture/LectureNav";
import LectureVideo from "../../../components/Lecture/LectureVideo.js";
import styles from "../../../styles/Lecture.module.scss";
import {useState} from "react";
import {dummyVideo} from "../../../data/dummyVideo";
 // 더미데이터

const videoPage = () => {
    const router = useRouter()
    const {id, videoId} = router.query ;// 경로 /lecture/[id]/[videoId]
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    if (!videoId) {
        return <></>
    }
    return (<div className={styles.lecturePage}>
        <LectureNav lecture = {dummyVideo} id={id} />
        <LectureVideo title={dummyVideo.list[videoId-1].content} />
    </div>)
}

export default videoPage