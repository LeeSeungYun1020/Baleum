import React from "react";
import styles from "../../styles/Lecture.module.scss";
import SearchNav from "../../components/Search/SearchNav";
import SearchList from "../../components/Search/SearchList";
import {dummyCategory} from "../../data/dummyCategory";
import {useRouter} from "next/router";
const Search = () => {
    const router = useRouter()
    const {id} = router.query;
    return (
        <div className={styles.searchPage}>
            <SearchNav categories = {dummyCategory} />
            <SearchList id = {id} />
        </div>
    )
}

export default Search