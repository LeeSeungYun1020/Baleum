import Link from "next/link";
import styles from "../../styles/Search.module.scss";

const ROUTE_LECTURE_ID = "/search/[id]"; // url

const SearchNav = (categories) => {
    return (
        <div className={styles.searchNav}>
            {categories.categories.map((list, index) => <ul key={index}>
                <Link href={{
                    pathname: ROUTE_LECTURE_ID,
                    query: {id: list.name}
                }}
                      passHref={false}>
                    <li><a>{list.name}</a></li>
                </Link>
            </ul>)}
            {/*{console.log(categories)}*/}
            {/*categories.categories.list로 해야함*/}
        </div>
    )
}

export default SearchNav