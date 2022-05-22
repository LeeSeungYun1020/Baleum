import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import Link from "next/link";
import {ROUTE_LECTURE_LIST_ID} from "../../data/global";
import styles from "../../styles/Lecture.module.scss";
import {LoginContext} from "../../pages/_app";
const LectureListComponent = ({lecture, isBefore}) => {
    const {isLogin, currentUserId} = useContext(LoginContext);
    const [contents, setContents] = useState();
    useEffect(() => {
        console.log(lecture)
        axios.get(`${SERVER_URL}/class/contents/${lecture.id}`, {withCredentials: true})
            .then(response => {
                // console.log(response)
                if (response.data[0]) {
                    // console.log(response);
                    setContents(response.data)
                }
            })
            .catch(err => console.log(err))
    }, [lecture])
    return (
        <ul>
            {contents ? ((isBefore && lecture.userId !== currentUserId || !isLogin) ? contents.map((list, index) => <li key={index}><p className={styles.LectureContentType}>{list.type}</p><p>{list.title}</p></li>)
         : contents.map((list, index) =>
            <Link key={index} href={{
                pathname: ROUTE_LECTURE_LIST_ID,
                query: { id : list.classId, videoId: list.contentId}
            }}>
            <a><li><p className={styles.LectureContentType}>{list.type}</p><p>{list.title}</p></li></a>
            </Link>)) : null}
        </ul>
    )

}

export default LectureListComponent