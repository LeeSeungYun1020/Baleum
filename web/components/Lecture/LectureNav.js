import styles from "../../styles/Lecture.module.scss";
import Link from "next/link";
import {ROUTE_LECTURE_ID} from "../../data/global";
import {ROUTE_LECTURE_LIST_ID} from "../../data/global";
import Loading from "../Loading";

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
                <h3>{lecture.userId}</h3>
            </div>
            <div className={styles.lectureNavContent}>
                <h3>강의 목록</h3>
                {/*<ul>*/}
                {/*    {lecture.list.map(list =>*/}
                {/*            <Link key={id} href={{*/}
                {/*                pathname: ROUTE_LECTURE_LIST_ID,*/}
                {/*                query: { id : id, videoId: list.id}*/}
                {/*            }}>*/}
                {/*        <a><li key = {list.id}>{list.content}</li></a>*/}
                {/*     </Link>*/}
                {/*    )}*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}

export default LectureNav