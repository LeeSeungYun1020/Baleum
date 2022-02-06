import Video from "./Video";
import styles from "../../styles/Lecture.module.scss"
const LectureVideo = ({title}) => {
    return (
        <div className={styles.lectureVideo}>
            {/*<h1>영상 제목</h1>*/}
            <Video title={title} />
        </div>
    )
}

export default LectureVideo;