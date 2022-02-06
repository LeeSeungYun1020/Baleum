import styles from "../../styles/Lecture.module.scss";
import Link from "next/link";

const ROUTE_LECTURE_ID = "/lecture/[id]"; // url
const ROUTE_LECTURE_LIST_ID = "/lecture/[id]/[videoId]"; // url

const LectureNav = ({lecture, id}) => {
    return (
        <div className={styles.lectureNav}>
            <div className={styles.lectureNavTitle}>
                <Link href={{
                    pathname: ROUTE_LECTURE_ID,
                    query: {id: id}
                }}>
                    <a><h2>{lecture.title}</h2></a>
                </Link>
                <h3>{lecture.author}</h3>
            </div>
            <div className={styles.lectureNavContent}>
                <h3>강의 목록</h3>
                <ul>
                    {lecture.list.map(list =>
                            <Link href={{
                                pathname: ROUTE_LECTURE_LIST_ID,
                                query: { id : id, videoId: list.id}
                            }}>
                        <a><li key = {list.id}>{list.content}</li></a>
                     </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default LectureNav