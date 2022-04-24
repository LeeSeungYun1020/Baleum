import {useRouter} from "next/router";
import LectureNav from "../../../components/Lecture/LectureNav";
import LectureInfo from "../../../components/Lecture/LectureInfo";
import styles from "../../../styles/Lecture.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../data/global";
import LectureTopNav from "../../../components/Lecture/LectureTopNav";

const Lecture = () => {
    const router = useRouter();
    const {id} = router.query // 얘는 url (강의의 id)
    const [lecture, setLecture] = useState();
    const [loading, setLoading] = useState(false); // 데이터 로딩
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(id !== undefined) {
                    const response = await axios.get(`${SERVER_URL}/class/info/${id}`, {withCredentials: true});
                    if (response.data[0].result) {
                        setLecture(response.data[0])
                    } else {
                        router.push('/');
                    }
                }
                else {
                    setLoading(true);
                }
            } catch (e) {
                router.push('/'); // 오류 발생하면 걍 홈으로 가자~~~~
            }
            setLoading(false);
        }
        fetchData();
    },[id])
    if(loading) {
        return <></>
    }
    return (
        <>
            <LectureTopNav />
            <div className={styles.lecturePage}>
                <LectureNav lecture = {lecture} id={id} />
                <LectureInfo lecture = {lecture} id={id}/>
            </div>
        </>
    )
}

export default Lecture