import styles from "../../styles/Home.module.scss";
import {dummyLecture} from "../../data/dummyLecture";
import HomeLectureCard from "./HomeLectureCard";

const HomeLectureList = () => {
    return (
        <div className={styles.lectureList}>
            {dummyLecture.map((dummy, index) => <HomeLectureCard dummy = {dummy} key = {index}/>)}
        </div>)
}

export default HomeLectureList