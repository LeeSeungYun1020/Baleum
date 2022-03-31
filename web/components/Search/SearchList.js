import {dummyLecture} from "../../data/dummyLecture";
import styles from "../../styles/Search.module.scss"
import SearchLectureCard from "./SearchLectureCard";

const SearchList = ({id}) => {
    return (
        <div className={styles.searchList}>
            {(id === undefined) ?
                dummyLecture.map((dummy, index) => <SearchLectureCard dummy={dummy} key={index}/>) // 이 경우에 모든 강의 다 뜨도록 할 예정
                : dummyLecture.map((dummy, index) => <SearchLectureCard dummy={dummy} key={index}/>)
            }
        </div>
    )
}

export default SearchList