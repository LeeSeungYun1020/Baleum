import {useRouter} from "next/router";
import LectureNav from "../../../components/Lecture/LectureNav";
import LectureInfo from "../../../components/Lecture/LectureInfo";
import styles from "../../../styles/Lecture.module.scss";
import {dummyVideo} from "../../../data/dummyVideo";

const Lecture = () => {
    const router = useRouter()
    const {id} = router.query // 얘는 url (강의의 id)
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    return (<div className={styles.lecturePage}>
        <LectureNav lecture = {dummyVideo} id={id} />
        <LectureInfo lecture = {dummyVideo} id={id}/>
    </div>)
}

export default Lecture