import styles from "../../styles/Lecture.module.scss"
import Loading from "../Loading";
import LectureListComponent from "./LectureListComponent";
import BlockList from "./BlockList";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
const LectureInfo = ({lecture}) => {
    if(!lecture) {
        return (
            <Loading />
        )
    }
    const onClick = () => {
        axios.post(`${SERVER_URL}/class/enrol/${lecture.id}`, {}, {withCredentials: true})
            .then(response => {
                if(response.data.result) {
                    alert("수강신청이 완료되었습니다.")
                }
                else {
                    alert("수강신청이 실패하였습니다. 다시 시도해주세요.")
                }
            })
    }
    return (
        <div className={styles.lectureInfo}>
            <h1 className={styles.lectureTitle}>{lecture.name}</h1>
            <button className={styles.lectureRegisterBtn} onClick={onClick}>수강 신청</button>
            <h2 className={styles.lectureAuthor}>{lecture.teacher}</h2>
            <div className={styles.lectureDescribe}>
                <h3>강의 요약</h3>
                <p>{lecture.detail}</p>
            </div>
            <div className={styles.lectureBlock}><BlockList classId={lecture.id}/></div>
            {/* 블록체인 부분 들어가는 곳!!!*/}
            <ul className={styles.lectureInfoList}>
                {/*{console.log(lecture)}*/}
                <h2>강의 목록</h2>
                <LectureListComponent contents={lecture}/>
            </ul>
        </div>
    )
}

export default LectureInfo