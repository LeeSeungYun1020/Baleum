import Video from "./Video";
import styles from "../../styles/Lecture.module.scss"
const LectureVideo = ({title ,url, videoId, id}) => {
    return (
        <div className={styles.lectureVideo}>
            {/*<h1>영상 제목</h1>*/}
            <Video title={title} url={url} videoId={videoId} id={id}/>
        </div>
    )
}

export default LectureVideo