import styles from "../../styles/Lecture.module.scss";
import Link from "next/link";
import {ROUTE_LECTURE_ID, SERVER_URL} from "../../data/global";
import Loading from "../Loading";
import LectureNavListComponent from "./LectureNavListComponent";
import {useEffect, useState} from "react";
import axios from "axios";

const LectureNav = ({lecture, id}) => {
    const [isBefore, setIsBefore] = useState(true); // true이면 수강신청 안한거
    useEffect(() => {
        axios.get(`${SERVER_URL}/class/isBefore/${id}`, {withCredentials: true})
            .then(response => {
                // console.log(response)
                if(response.data.result) {
                    setIsBefore(true);
                }
                else {
                    setIsBefore(false);
                }
            })
    },[])
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
                <LectureNavListComponent lecture={lecture} isBefore={isBefore} />
            </div>
        </div>
    )
}

export default LectureNav