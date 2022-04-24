import styles from "../../styles/Lecture.module.scss"
import {useRouter} from "next/router";
import {CLIENT_URL, ROUTE_LECTURE_ID} from "../../data/global";
import QRCode from "react-qr-code";
import {useContext} from "react";
import {LoginContext} from "../../pages/_app";

const MyLectureComponent = (lecture) => {
    // console.log(lecture);
    const {id} = useContext(LoginContext)
    const router = useRouter()
    const onClick = () => {
        router.push({
            pathname: ROUTE_LECTURE_ID,
            query: {id: lecture.lecture.id}
        })
    }

    const onQRClick = (e) => {
        e.stopPropagation();
        router.push(`${CLIENT_URL}/certification/lecture/${lecture.lecture.id}/${id}`);
    }
    return (<div className={styles.myLectureComponent} onClick={onClick}>
        <div className={styles.myLectureInfoText}>
            <QRCode value={`${CLIENT_URL}/certification/lecture/${lecture.lecture.id}/${id}`} onClick={onQRClick} size={100} style={{float: "right"}}/>
            {/*모두가 볼 수 있는 사용자의 이 과목 학습 인증서로 넘어감*/}
            <div><h1 className={styles.myLectureText}>강의명 </h1><h1>{lecture.lecture.name}</h1></div>
            <div><h2 className={styles.myLectureText}>강의자 </h2><h2>{lecture.lecture.teacher}</h2></div>
            {/*<div><h2 className={styles.myLectureText}>강의기간 </h2><h2>{lecture.lecture.time}</h2></div>*/}
            <div><h2 className={styles.myLectureText}>강의 요약 </h2><h2>{lecture.lecture.detail}</h2></div>
            {/*<div><h2 className={styles.myLectureText}>진도율 </h2>{lecture.lecture.percent}</div>*/}
            <div><h2 className={styles.myLectureText}>분류 </h2><h2>{lecture.lecture.category}</h2></div>
            <div>{lecture.lecture.complete && <button>수료증</button>}</div>
        {/*    수강 완료에서는 [자세히] 버튼으로, 누르면 강의 별 수강 인증 화면-> 얘는 lecture/id 재활용한거*/}
        {/*    카테고리 */}
        </div>
        {/*<div className={styles.myLectureImageBox}>*/}
        {/*    /!*<Image src={lecture.lecture.src} width={100} height={100} alt={"lecture image"} objectFit={"cover"}/>*!/*/}
        {/*/!*    사진 대신 큐알 코드*!/*/}

        {/*</div>*/}
    </div>)
}

export default MyLectureComponent