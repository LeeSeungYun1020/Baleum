import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {CLIENT_URL, SERVER_URL} from "../../../../data/global";
import CertificationLectureComponent from "../../../../components/Certification/CertificationLectureComponent";
import BlockList from "../../../../components/Lecture/BlockList";
import styles from "../../../../styles/Lecture.module.scss";
import QRCode from "react-qr-code";

const certification = () => {
    const router = useRouter();
    const [lecture, setLecture] = useState();
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState();
    const [title, setTitle] = useState("");
    const {id, userId} = router.query; // id는 클래스id, userId는 유저 id
    const [name, setName] = useState("");
    const onQRClick = (e) => {
        e.stopPropagation();
        router.push(`${CLIENT_URL}/certification/lecture/${id}/${userId}`); // userId 있으면 그거 찾으면 됨
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setTimeout(async () => {
                  if(id && userId) {
                      const response1 = await axios.get(`${SERVER_URL}/class/process/${userId}/${id}`, {withCredentials: true})
                      const response2 = await axios.get(`${SERVER_URL}/class/complete/${userId}/${id}`, {withCredentials: true})
                      const response3 = await axios.get(`${SERVER_URL}/class/info/${id}`, {withCredentials: true})
                      const response4 = await axios.get(`${SERVER_URL}/users/name/${userId}`, {withCredentials: true});
                      // setName(response2.data)
                      if(response1.data[0].result) {
                            setLecture(response1.data);
                            // console.log(response.data);
                            setLoading(false);
                      }
                      else {
                          router.push('/');
                      }
                      if(response2.data[0].result) {
                          if(response2.data[0].isCompleted) {
                              setIsCompleted(true);
                          }
                          else {
                              setIsCompleted(false);
                          }
                      }
                      else {
                          setIsCompleted(false);
                      }
                      if(response3.data[0].result){
                          setTitle(response3.data[0].name);
                      }
                      // console.log(response2)
                      if(response4.data.result) {
                          setName(response4.data.name);
                      }
                      else {
                          setName(userId)
                      }
                  }
                  else {
                  }
                }, 500)
            }catch (e) {
                router.push('/');
            }
        }
        fetchData()
    },[id, userId])

    if(loading) {
        return (<></>)
    }
    return (
        <div className={styles.CertificationDiv}>
            <div className={styles.CertificationInfo}>{isCompleted ? <h1>{name} 님이 수강완료한<br/> {title} 강의입니다.</h1> : <h1>{name} 님이 수강 진행중인 {title} 강의입니다.</h1>}<QRCode value={`${CLIENT_URL}/certification/lecture/${id}/${userId}`} onClick={onQRClick} size={100} style={{cursor: "pointer"}}/></div>
            <div className={styles.lectureBlock}><BlockList classId={id} userId={userId}/></div>
            <div className={styles.CertificationInfo}><h1>상세 내용</h1></div>
            {lecture.map((lecture, index) => <CertificationLectureComponent lecture={lecture} key={index}/>)}
        </div>
    )

}

export default certification;