import Link from "next/link";
import styles from "../../styles/Search.module.scss";
import {ROUTE_LECTURE_ID} from "../../data/global";

const SearchNav = (categories) => {
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
                    {/*// <li onClick={onClick} key={index}><p>{list.name}</p></li>)}*/}
            </ul>
        </div>
    )
}

export default SearchNav