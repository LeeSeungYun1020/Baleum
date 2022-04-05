import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import Loading from "../../components/Loading";
import MyLectureComponent from "../../components/Lecture/MyLectureComponent";
import styles from "../../styles/Lecture.module.scss";

const certification = () => {
    const router = useRouter()
    const {userId} = router.query;
    if(!userId) {
        return (<></>)
    }
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false); // 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/class/complete/list/${userId}`, {withCredentials: true});
                setItem(response.data)
                // console.log(response)
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    if(loading) {
        return <Loading/>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <div className={styles.certificationCompletePage}>
            <p>{userId}님이 수강완료한 강의입니다.</p>
            {item[0].result ? item.map((item, index) => <MyLectureComponent key={index} lecture = {item} />) : <h3>수강 완료한 강의가 존재하지 않습니다.</h3>}
        </div>
    )
}

export default certification;
