import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../_app";
import {useRouter} from "next/router";
import axios from "axios";
import {SERVER_URL} from "../../../../data/global";
import LectureNav from "../../../../components/Lecture/LectureNav";
// import styles from "../../../../styles/Users.module.scss";

const write = () => {
    const router = useRouter();
    const {id} = router.query;
    if(!id) {
        return <></>
    }
    const {currentUserId} = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [lecture, setLecture] = useState();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/class/notice/create`, {
            classId: id,
            title: title,
            contents: contents
        }, {withCredentials: true})
            .then (
                response => {
                    console.log(response);
                    if(response.data) {
                        alert("공지사항이 작성되었습니다.");
                        router.push(`/lecture/${id}/notice`)
                    }
                    else {
                        alert("잠시후 다시 시도해주세요.");
                    }
                }
            )
    }
    const titleChange = e => {
        setTitle(e.target.value);
    }
    const contentsChange = e => {
        setContents(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/class/info/${id}`,{withCredentials: true})
                if(response.data[0].result) {
                    setLecture(response.data[0])
                }
                else {
                    router.push('/')
                }
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, [])
    if(lecture && lecture.userId !== currentUserId) {
        router.push("/");
    }
    if(loading) {
        return (
            <></>
        )
    }
    return (
        <div>
            <LectureNav lecture = {lecture} id = {id}/>
            <div>
                <form onSubmit={onSubmit}>
                    <input type={"text"} id={"title"} name={"title"} required onChange={titleChange}/>
                    <input type={"text"} id={"contents"} name={"contents"} required onChange={contentsChange}/>
                    <input type={"submit"} value={"완료"}/>
                </form>
            </div>
        </div>
    )
}

export default write