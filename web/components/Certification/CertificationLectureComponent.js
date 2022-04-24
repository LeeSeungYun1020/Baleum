import styles from "../../styles/Certification.module.scss";

const CertificationLectureComponent = (lecture) => {
    if(!lecture) {
        return (
            <></>
        )
    }
    return (
        <div className={styles.CertificationLectureComponent}>
            <div>
            <div className={styles.CertificationLectureList}><h1>#&nbsp;</h1><h1>{lecture.lecture.contentId}</h1></div>
            <div className={styles.CertificationLectureList}><h1>{lecture.lecture.title}</h1></div>
            <div className={styles.CertificationLectureList}><h2>{lecture.lecture.date.split('T')[0]}</h2></div>
            <div className={styles.CertificationLectureList}><h2>점수:&nbsp;</h2><h2>{lecture.lecture.score}</h2></div>
            <div className={styles.CertificationLectureList}><h2>Block Hash:&nbsp;</h2><h2>{lecture.lecture.blockHash}</h2></div>
            <div className={styles.CertificationLectureList}><h2>Transaction Hash:&nbsp;</h2><h2>{lecture.lecture.transactionHash}</h2></div>
            </div>
        </div>
    )
}

export default CertificationLectureComponent;