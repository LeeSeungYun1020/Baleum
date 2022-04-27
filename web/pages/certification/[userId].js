import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CLIENT_URL, SERVER_URL} from "../../data/global";
import Loading from "../../components/Loading";
import MyLectureComponent from "../../components/Lecture/MyLectureComponent";
import styles from "../../styles/Lecture.module.scss";
import QRCode from "react-qr-code";

const certification = () => {
    const router = useRouter()
    const {userId} = router.query;
    if(!userId) {
        return (<></>)
    }
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const [name, setName] = useState("");
    const onQRClick = (e) => {
        e.stopPropagation();
        router.push(`${CLIENT_URL}/certification/${userId}`);
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response1 = await axios.get(`${SERVER_URL}/class/complete/list/${userId}`, {withCredentials: true});
                setItem(response1.data)
                const response2 = await axios.get(`${SERVER_URL}/users/name/${userId}`, {withCredentials: true});
                if(response2.data.result) {
                    setName(response2.data.name);
                }
                else {
                    setName(userId)
                }
                console.log(response2)
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
            <div className={styles.certificationCompleteQRLocation}>
                <p>{name} 님이 수강완료한 강의 목록입니다.</p>
                <QRCode value={`${CLIENT_URL}/certification/${userId}`} onClick={onQRClick} size={100} style={{cursor: "pointer"}}/>
            </div>
            {item[0].result ? item.map((item, index) => <MyLectureComponent key={index} userId={userId} lecture = {item} />) : <h3>수강 완료한 강의가 존재하지 않습니다.</h3>}
        </div>
    )
}

export default certification;