import styles from "../../styles/Search.module.scss";
import {useRouter} from "next/router";

const SearchNav = (categories) => {
    const router = useRouter();
    const onClick = e => {
        router.push(`/search/${e.target.innerText}`)
    }
    return (
        <div className={styles.searchNav}>
            <ul>
            {categories.categories.map((list, index) =>
                <li onClick={onClick} key={index}><p>{list.name}</p></li>)}
            </ul>
        </div>
    )
}

export default SearchNav