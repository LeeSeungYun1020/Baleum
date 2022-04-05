import styles from "../../styles/Lecture.module.scss";
import Link from "next/link";
import {ROUTE_LECTURE_ID} from "../../data/global";
import Loading from "../Loading";
import LectureNavListComponent from "./LectureNavListComponent";

const LectureNav = ({lecture, id}) => {
    if(!lecture) {
        return (
            <Loading />
        )
    }
    return (
        <div className={styles.lectureNav}>
            <div className={styles.lectureNavTitle}>
                <Link href={{
                    pathname: ROUTE_LECTURE_ID,
                    query: {id: id}
                }}>
                    <a><h2>{lecture.name}</h2></a>
                </Link>
                <h3>{lecture.teacher}</h3>
            </div>
            <div className={styles.lectureNavContent}>
                <h3>강의 목록</h3>
                <LectureNavListComponent lecture={lecture} />
            </div>
        </div>
    )
}

export default LectureNav