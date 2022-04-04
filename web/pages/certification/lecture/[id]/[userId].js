import {useRouter} from "next/router";
import CertificationLectureInfo from "../../../../components/Certification/CertificationLectureInfo";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../../data/global";

const certification = () => {
    const router = useRouter()
    const {id, userId} = router.query; // id는 클래스id, userId는 유저 id
    if(!id || !userId) {
        return (<></>)
    }
    const [lecture, setLecture] = useState()
    useEffect(() => {
        axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
            .then (response => {
                if(response.data[0].result) {
                    // console.log(response.data[0])
                    setLecture(response.data[0])
                }
                else {

                }
                // console.log(response)
            })

    },[])
    return (
        <>
            <CertificationLectureInfo lecture={lecture} userId={userId}/>
        </>
            )

}

export default certification