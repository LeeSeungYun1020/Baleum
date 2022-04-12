import {useRouter} from "next/router";
import LectureNav from "../../../components/Lecture/LectureNav";
import LectureInfo from "../../../components/Lecture/LectureInfo";
import styles from "../../../styles/Lecture.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../data/global";
import LectureTopNav from "../../../components/Lecture/LectureTopNav";

const Lecture = () => {
    const router = useRouter()
    const {id} = router.query // 얘는 url (강의의 id)
    const [lecture, setLecture] = useState();
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    useEffect(() => {
        axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
            .then (response => {
                if(response.data[0].result) {
                    // console.log(response.data[0])
                    setLecture(response.data[0])
                }
                else {

                }
            })

    },[id])
    return (
        <>
            <LectureTopNav />
            <div className={styles.lecturePage}>
        <LectureNav lecture = {lecture} id={id} />
        <LectureInfo lecture = {lecture} id={id}/>
    </div>
            </>)
}

export default Lecture