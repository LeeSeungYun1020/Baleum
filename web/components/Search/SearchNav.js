import Link from "next/link";
import styles from "../../styles/Search.module.scss";
import {ROUTE_LECTURE_ID, SERVER_URL} from "../../data/global";
import axios from "axios";

const SearchNav = (categories) => {
    const onClick = e => {
        console.log(e.target.innerText)
        axios.get(`${SERVER_URL}/class/category/${e.target.innerText}`, {withCredentials: true})
            .then(response => console.log(response.data))
    }
    return (
        <div className={styles.searchNav}>
            <ul>
            {categories.categories.map((list, index) =>
            <Link href={{
                pathname: ROUTE_LECTURE_ID,
                query: {id: list.name}
            }}
                  passHref={false}>
                <li onClick={onClick} key={index}><p>{list.name}</p></li>
            </Link>)}
            </ul>
        </div>
    )
}

export default SearchNav