import styles from "../../styles/Lecture.module.scss"
import Loading from "../Loading";
import LectureListComponent from "./LectureListComponent";
import BlockList from "./BlockList";
const LectureInfo = ({lecture}) => {
    if(!lecture) {
        return (
            <Loading />
        )
    }
    return (
        <div className={styles.lectureInfo}>
            <h1 className={styles.lectureTitle}>{lecture.name}</h1>
            <h2 className={styles.lectureAutor}>{lecture.teacher}</h2>
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