import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../../data/global";
import CertificationLectureComponent from "../../../../components/Certification/CertificationLectureComponent";

const certification = () => {
    const router = useRouter();
    const [lecture, setLecture] = useState();
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState();
    const {id, userId} = router.query; // id는 클래스id, userId는 유저 id
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setTimeout(async () => {
                  if(id && userId) {
                      const response1 = await axios.get(`${SERVER_URL}/class/process/${userId}/${id}`, {withCredentials: true})
                      const response2 = await axios.get(`${SERVER_URL}/class/complete/${userId}/${id}`, {withCredentials: true})
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
        <>
            {isCompleted ? <h2>{userId}님이 수강완료한 강의입니다.</h2> : <h2>{userId}님이 수강 진행중인 강의입니다.</h2>}
            {lecture.map((lecture, index) => <CertificationLectureComponent lecture={lecture} key={index}/>)}
        </>
    )

}

export default certification;