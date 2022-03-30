import {dummyLecture} from "../../data/dummyLecture";
import LectureCard from "../LectureCard";
const SearchList = ({id}) => {
    return (
        <>
            {(id === undefined) ?
                dummyLecture.map((dummy, index) => <div key = {index}>응애 나 아기 윰</div>)
                :  dummyLecture.map((dummy, index) => <LectureCard dummy = {dummy} key = {index} />)
            }}
        </>
    )
}

export default SearchList