import Link from "next/link";
import styles from "../../styles/Lecture.module.scss";
const ROUTE_LECTURE_ID = "/search/[id]"; // url

const SearchNav = ({categories}) => {
    return (
       <div className={styles.searchNav}>
           {categories.list.map(list => <div>
               <Link href ={{
                   pathname: ROUTE_LECTURE_ID,
                   query: {id: list.id}
               }} >
                   <a>{list.title}</a>
               </Link>
           </div>)}


       </div>
    )
}

export default SearchNav