import styles from "../../styles/Home.module.scss";

import {dummyLecture} from "../../data/dummyLecture";
import LectureCard from "../LectureCard";

const HomeLectureList = () => {
    return (
        <div className={styles.lectureList}>
            {dummyLecture.map((dummy, index) => <LectureCard dummy = {dummy} index = {index}/>)}
        </div>)
}

export default HomeLectureList