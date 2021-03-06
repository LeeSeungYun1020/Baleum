import {useRouter} from "next/router";
import LectureNav from "../../../components/Lecture/LectureNav";
import LectureVideo from "../../../components/Lecture/LectureVideo.js";
import styles from "../../../styles/Lecture.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../data/global";
import LectureTopNav from "../../../components/Lecture/LectureTopNav";
 // 더미데이터

const videoPage = () => {
    const router = useRouter()
    const {id, videoId} = router.query ;// 경로 /lecture/[id]/[videoId]
    if (!videoId) {
        return <></>
    }
    const [lecture, setLecture] = useState();
    const [content, setContent] = useState();
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    useEffect(() => {
        axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
            .then (response => {
                if(response.data[0].result) {
                    setLecture(response.data[0])
                }
                else {
                    router.push("/")
                }
            })

    },[id])
    useEffect(() => {
        axios.get(`${SERVER_URL}/class/contents/${id}/${videoId}`,{withCredentials: true})
            .then (response => {
                    if (response.data[0].result) {
                        setContent(response.data[0])
                    }
                    else {
                        router.push("/")
                    }
                }
            )
    },[videoId])
    return (
        <>
            <LectureTopNav />
        <div className={styles.lecturePage}>
        <LectureNav lecture = {lecture} id={id} />
        {/*{content && console.log(content.url)}*/}
        {content && <LectureVideo title={content.title} url={content.url} id={id} videoId={videoId} />}
    </div>
            </>)
}

export default videoPage