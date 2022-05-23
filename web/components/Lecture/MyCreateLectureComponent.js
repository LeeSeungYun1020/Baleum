import styles from "../../styles/Lecture.module.scss"
import {useRouter} from "next/router";
import {ROUTE_LECTURE_ID, SERVER_URL} from "../../data/global";
import axios from "axios";
import Link from "next/link";
// import {useContext} from "react";
// import {LoginContext} from "../../pages/_app";

const MyCreateLectureComponent = ({lecture, onRemove}) => {
    // console.log(lecture);
    // const {id} = useContext(LoginContext)
    const router = useRouter()
    const onClick = () => {
        router.push({
            pathname: ROUTE_LECTURE_ID,
            query: {id: lecture.id}
        })
    }

    const onUpdate = (e) => {
        e.stopPropagation()
    }

    const onDelete = (e) => {
        e.stopPropagation();
        if(window.confirm("강의를 삭제하시겠습니까?")) {
            axios.delete(`${SERVER_URL}/class/delete/${lecture.id}`, {withCredentials: true})
                .then(response => {
                        console.log(response);
                        if (response.data.result) {
                            onRemove(lecture.id);
                        } else {
                            alert("오류가 발생하였습니다.")
                        }
                    }
                )
        }
    }

    return (<div className={styles.myLectureComponent} onClick={onClick}>
        <div className={styles.myLectureInfoText}>
            <div className={styles.myCreateLectureButtonDiv}>
                <button onClick={onUpdate}><Link href={{
                    pathname: `/lecture/my/update/[lectureUpdate]`,
                    query: {lectureUpdate: JSON.stringify(lecture)}
                }}><a>강의 수정</a></Link></button>
                <button onClick={onDelete}>강의 삭제</button>
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