import styles from "../../styles/Lecture.module.scss"
import {useRouter} from "next/router";
import {ROUTE_LECTURE_ID} from "../../data/global";
// import {useContext} from "react";
// import {LoginContext} from "../../pages/_app";

const MyCreateLectureComponent = ({lecture}) => {
    // console.log(lecture);
    // const {id} = useContext(LoginContext)
    const router = useRouter()
    const onClick = () => {
        router.push({
            pathname: ROUTE_LECTURE_ID,
            query: {id: lecture.id}
        })
    }

    return (<div className={styles.myLectureComponent} onClick={onClick}>
        <div className={styles.myLectureInfoText}>
            <div className={styles.myCreateLectureButtonDiv}>
                <button>강의 수정</button>
                <button>강의 삭제</button>
            </div>
            {/*모두가 볼 수 있는 사용자의 이 과목 학습 인증서로 넘어감*/}
            <div><h1 className={styles.myLectureText}>강의명 </h1><h1>{lecture.name}</h1></div>
            <div><h2 className={styles.myLectureText}>강의자 </h2><h2>{lecture.teacher}</h2></div>
            <div><h2 className={styles.myLectureText}>강의 요약 </h2><h2>{lecture.detail}</h2></div>
            <div><h2 className={styles.myLectureText}>분류 </h2><h2>{lecture.category}</h2></div>
            {/*<div>{lecture.completedDate && <button>수료증</button>}</div>*/}
            {/*    수강 완료에서는 [자세히] 버튼으로, 누르면 강의 별 수강 인증 화면-> 얘는 lecture/id 재활용한거*/}
            {/*    카테고리 */}
        </div>
        {/*</div>*/}
    </div>)
}

export default MyCreateLectureComponent