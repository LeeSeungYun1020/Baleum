import styles from "../../styles/Lecture.module.scss"
import {useRouter} from "next/router";
import {CLIENT_URL, ROUTE_LECTURE_ID} from "../../data/global";
import QRCode from "react-qr-code";
import {useContext} from "react";
import {LoginContext} from "../../pages/_app";

const MyLectureComponent = ({lecture, userId}) => {
    // console.log(lecture);
    const {id} = useContext(LoginContext)
    const router = useRouter()
    const onClick = () => {
        router.push({
            pathname: ROUTE_LECTURE_ID,
            query: {id: lecture.id}
        })
    }
    const onQRClick = (e) => {
        e.stopPropagation();
        router.push(`${CLIENT_URL}/certification/lecture/${lecture.id}/${userId||id}`); // userId 있으면 그거 찾으면 됨
    }
    return (<div className={styles.myLectureComponent} onClick={onClick}>
        <div className={styles.myLectureInfoText}>
            <QRCode value={`${CLIENT_URL}/certification/lecture/${lecture.id}/${userId||id}`} onClick={onQRClick} size={100} style={{float: "right", marginLeft: "20px"}}/>
            {/*모두가 볼 수 있는 사용자의 이 과목 학습 인증서로 넘어감*/}
            <div><h1 className={styles.myLectureText}>강의명 </h1><h1>{lecture.name}</h1></div>
            <div><h2 className={styles.myLectureText}>강의자 </h2><h2>{lecture.teacher}</h2></div>
            {/*<div><h2 className={styles.myLectureText}>강의기간 </h2><h2>{lecture.lecture.time}</h2></div>*/}
            <div><h2 className={styles.myLectureText}>강의 요약 </h2><h2>{lecture.detail}</h2></div>
            {/*<div><h2 className={styles.myLectureText}>진도율 </h2>{lecture.lecture.percent}</div>*/}
            <div><h2 className={styles.myLectureText}>분류 </h2><h2>{lecture.category}</h2></div>
            <div>{lecture.complete && <button>수료증</button>}</div>
        {/*    수강 완료에서는 [자세히] 버튼으로, 누르면 강의 별 수강 인증 화면-> 얘는 lecture/id 재활용한거*/}
        {/*    카테고리 */}
        </div>
        {/*</div>*/}
    </div>)
}

export default MyLectureComponent