import Link from "next/link";
import styles from "../../styles/Search.module.scss";

const ROUTE_LECTURE_ID = "/search/[id]"; // url

const SearchNav = ({categories}) => {
    return (
        <div className={styles.searchNav}>
            {categories.list.map(list => <ul key={list.id}>
                <Link href={{
                    pathname: ROUTE_LECTURE_ID,
                    query: {id: list.id}
                }}
                 passHref={false}>
                    <li><a>{list.title}</a></li>
                </Link>
            </ul>)}


        </div>
    )
}

export default SearchNav