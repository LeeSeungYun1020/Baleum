import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import Link from "next/link";
import {ROUTE_LECTURE_LIST_ID} from "../../data/global";
import {LoginContext} from "../../pages/_app";
import {useRouter} from "next/router";

const LectureNavListComponent = (lecture) => {
    const [contents, setContents] = useState();
    const router = useRouter();
    const {isLogin} = useContext(LoginContext);
    useEffect(() => {
        // console.log(lecture)
        axios.get(`${SERVER_URL}/class/contents/${lecture.lecture.id}`, {withCredentials: true})
            .then(response => {
                // console.log(response.data)
                if (response.data[0]) {
                    // console.log(response.data);
                    setContents(response.data)
                }
                else {
                    router.push('/');
                }
            })
            .catch(err => console.log(err))
    }, [lecture])

    if(!contents) {
        return (
            <></>
        )
    }
    // isBefore이 true면 수강신청 안한거
    return (
        <ul>
            {contents ? (
                lecture.isBefore||!isLogin ? contents.map((list, index) => (
                    <li key={index}>
                        <p>{list.title}</p>
                    </li>
                )) : contents.map((list, index) => (
                    <Link href={{
                        pathname: ROUTE_LECTURE_LIST_ID,
                        query: {id: list.classId, videoId: list.contentId}
                    }} key={index}>
                    <a><li>{list.title}</li></a></Link>))
            ) : null}
        </ul>
    )
}
export default LectureNavListComponent;