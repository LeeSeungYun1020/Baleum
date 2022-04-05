import styles from '../../styles/Lecture.module.scss'
import Loading from "../Loading";
import LectureListComponent from "../Lecture/LectureListComponent";
import BlockList from "../Lecture/BlockList";
const CertificationLectureInfo = ({lecture, userId}) => {
    if(!lecture) {
        return (
            <Loading />
        )
    }
    return (
        <div className={styles.lectureInfo}>
            <h2>{userId}의 학습 인증서입니다.</h2>
            <h1 className={styles.lectureTitle}>{lecture.name}</h1>
            <h2 className={styles.lectureAuthor}>{lecture.teacher}</h2>
            <div className={styles.lectureDescribe}>
                <h3>강의 요약</h3>
                <p>{lecture.detail}</p>
            </div>
            <div className={styles.lectureBlock}><BlockList classId={lecture.id} userId={userId}/></div>
            <ul className={styles.lectureInfoList}>
                <h2>강의 목록</h2>
                <LectureListComponent contents={lecture}/>
            </ul>
        </div>
    )
}

export default CertificationLectureInfo