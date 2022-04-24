import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import Link from "next/link";
import {ROUTE_LECTURE_LIST_ID} from "../../data/global";

const LectureListComponent = (lecture) => {
    const [contents, setContents] = useState();
    useEffect(() => {
        // console.log(lecture)
        axios.get(`${SERVER_URL}/class/contents/${lecture.lecture.id}`, {withCredentials: true})
            .then(response => {
                // console.log(response)
                if (response.data[0]) {
                    // console.log(response);
                    setContents(response.data)
                }
            })
            .catch(err => console.log(err))
        // console.log(lecture.isBefore)
    }, [lecture])
    return (
        <ul>
        {contents ? (lecture.isBefore ? contents.map((list, index) => <li key={index}>{list.title}</li>)
         : contents.map((list, index) =>
            <Link key={index} href={{
                pathname: ROUTE_LECTURE_LIST_ID,
                query: { id : list.classId, videoId: list.contentId}
            }}>
            <a><li>{list.title}</li></a>
            </Link>)) : null}
        </ul>
    )

}

export default LectureListComponent