import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../../data/global";
import CertificationLectureComponent from "../../../../components/Certification/CertificationLectureComponent";
import BlockList from "../../../../components/Lecture/BlockList";
import styles from "../../../../styles/Lecture.module.scss";

const certification = () => {
    const router = useRouter();
    const [lecture, setLecture] = useState();
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState();
    const [title, setTitle] = useState("");
    const {id, userId} = router.query; // id는 클래스id, userId는 유저 id
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setTimeout(async () => {
                  if(id && userId) {
                      const response1 = await axios.get(`${SERVER_URL}/class/process/${userId}/${id}`, {withCredentials: true})
                      const response2 = await axios.get(`${SERVER_URL}/class/complete/${userId}/${id}`, {withCredentials: true})
                      const response3 = await axios.get(`${SERVER_URL}/class/info/${id}`, {withCredentials: true})
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
            {console.log(lecture)}
            <div className={styles.CertificationInfo}>{isCompleted ? <h1>{userId}님이 수강완료한<br/> {title} 강의입니다.</h1> : <h1>{userId}님이 수강 진행중인 {id}번 강의입니다.</h1>}</div>
            <div className={styles.lectureBlock}><BlockList classId={id} userId={userId}/></div>
            <div className={styles.CertificationInfo}><h1>상세 내용</h1></div>
            {lecture.map((lecture, index) => <CertificationLectureComponent lecture={lecture} key={index}/>)}
        </div>
    )

}

export default certification;