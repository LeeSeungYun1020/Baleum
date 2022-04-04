import Link from "next/link";
import styles from "../../styles/Search.module.scss";
import axios from "axios";
import {SERVER_URL} from "../../data/global";

const ROUTE_LECTURE_ID = "/search/[id]"; // url

const SearchNav = (categories) => {
    const onClick = e => {
        console.log(e.target.innerText)
        axios.get(`${SERVER_URL}/class/category/${e.target.innerText}`, {withCredentials: true})
            .then(response => console.log(response.data))
    //  쪼꼼 더 고민해보쟈!!!!
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