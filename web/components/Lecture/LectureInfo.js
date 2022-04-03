import Link from "next/link";
import styles from "../../styles/Lecture.module.scss"
import {ROUTE_LECTURE_LIST_ID} from "../../data/global";
import Loading from "../Loading";
const LectureInfo = ({lecture, id}) => {
    if(!lecture) {
        return (
            <Loading />
        )
    }
    return (
        <div className={styles.lectureInfo}>
            <h1 className={styles.lectureTitle}>{lecture.name}</h1>
            <h2 className={styles.lectureAutor}>{lecture.userId}</h2>
            <div className={styles.lectureDescribe}>
                <h3>강의 요약</h3>
                <p>{lecture.detail}</p>
            </div>
            <div className={styles.lectureBlock}>블록이 들어갈 공간을 만들어보자!!</div>
            <ul className={styles.lectureInfoList}>
                {console.log(lecture)}
                <h2>강의 목록</h2>
                {/*{lecture.list.map(list =>*/}
                {/*    <Link key={id} href={{*/}
                {/*        pathname: ROUTE_LECTURE_LIST_ID,*/}
                {/*        query: { id : id, videoId: list.id}*/}
                {/*    }}>*/}
                {/*        <a><li key = {list.id}>{list.content}</li></a>*/}
                {/*    </Link>*/}
                {/*)}*/}
            </ul>
        </div>
    )
}

export default LectureInfo