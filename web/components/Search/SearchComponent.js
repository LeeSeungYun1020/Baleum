import styles from "../../styles/Search.module.scss"
import {FaSearch} from "react-icons/fa"
import {useRouter} from "next/router";
import {useState} from "react";

const SearchComponent = () => {
    const router = useRouter()
    const submit = () => {
        router.push(`/search/${search}`)
    }
    const [search, setSearch] = useState("");
    const change = e => {
        setSearch(e.target.value);
    }
    return (
        <div className={styles.searchArea}>
            {/* 검색창 */}
            <div className={styles.searchInput}>
                {/* 검색 내용*/}
                <input type="search" placeholder="원하는 강좌를 찾아보세요. (강좌명, 교수자명 등)"
                       value={search} onChange={change}/>
                <button type="submit" onClick={submit}><FaSearch size="25" color="gray"/></button>
            </div>
        </div>
    )
}

export default SearchComponent