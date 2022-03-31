import styles from "../../styles/Search.module.scss"
import {FaSearch} from "react-icons/fa"

const SearchComponent = () => {
    return (
        <div className={styles.searchArea}>
            {/* 검색창 */}
            <div className={styles.searchInput}>
                {/* 검색 내용*/}
                <input type="search" placeholder="원하는 강좌를 찾아보세요. (강좌명, 교수자명 등)"/>
                <button type="submit"><FaSearch size="25" color="gray"/></button>
            </div>
        </div>
    )
}

export default SearchComponent