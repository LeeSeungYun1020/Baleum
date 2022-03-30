import styles from "../../styles/Lecture.module.scss"
const MyLectureComponent = (lecture) => {
    return (
        <div className={styles.myLectureComponent}>
            <div className={styles.myLectureInfoText}>
                <div><h1 className={styles.myLectureText}>강의명 </h1><h1>{lecture.lecture.title}</h1></div>
                <div><h2 className={styles.myLectureText}>강의자 </h2><h2>{lecture.lecture.teacher}</h2></div>
                <div><h2 className={styles.myLectureText}>강의기간 </h2><h2>{lecture.lecture.time}</h2></div>
                <div><h2 className={styles.myLectureText}>진도율 </h2><h2>{lecture.lecture.percent}</h2></div>
                <div>{lecture.lecture.complete && <button>수료증</button>}</div>
            </div>
            <div><img src = {lecture.lecture.src} /></div>

        </div>
    )
}

export default MyLectureComponent