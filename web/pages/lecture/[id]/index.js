import {useRouter} from "next/router";
import LectureNav from "../../../components/Lecture/LectureNav";
import LectureInfo from "../../../components/Lecture/LectureInfo";
import styles from "../../../styles/Lecture.module.scss";

const dummyList = {
    "title": "나는 강의명이다!!!",
    "author": "김유미",
    "describe": "이것은 강의요약이다. 왜냐면 강의 요약이기 때문이다. 대충 몇줄 정도를 적어야 강의 요약이라고 할 수 있을까?? 그것은 정해지지 않았다. 왜냐면 요약은 내 맘이기 때문이다. 이정도면 되겠지??",
    "list": [
        {
            "id": "0",
            "content": "1번 강의다!!"
        },
        {
            "id": "1",
            "content": "2번 강의다!!!"
        },
        {
            "id": "2",
            "content": "3번 강의다!!!"
        },
        {
            "id": "3",
            "content": "4번 강의다!!!"
        },
        {
            "id": "4",
            "content": "5번 강의다!!!"
        },
        {
            "id": "5",
            "content": "6번 강의다!!!"
        }
    ]
} // 더미데이터

const Lecture = () => {
    const router = useRouter()
    const {id} = router.query // 얘는 url (강의의 id)
    // 여기서 뭐 id로 api 가져와서 강의 리스트 동적으로 받으면 될 듯
    return (<div className={styles.lecturePage}>
        <LectureNav lecture = {dummyList} id={id} />
        <LectureInfo lecture = {dummyList} id={id}/>
    </div>)
}

export default Lecture