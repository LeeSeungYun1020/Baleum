import styles from "../../styles/Home.module.scss";
import {dummyLecture} from "../../data/dummyLecture";
import HomeLectureCard from "./HomeLectureCard";

const HomeLectureList = ({lectureList}) => {
    return (
        <div className={styles.lectureList}>
            {lectureList.map((lecture, index) => <HomeLectureCard lecture={lecture} key={index}/>)}
        </div>)
}

export default HomeLectureList