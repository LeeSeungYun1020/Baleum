import styles from "../../styles/Lecture.module.scss";
import Link from "next/link";
import {FaUserCircle} from "react-icons/fa";
const LectureTopNav = () => {
    return(
        <div className={styles.LectureTopNav}>
            <ul>
                <li><Link href="/">바름</Link></li>
                <li className={styles.myLectureLink}><Link href="/lecture/my"><a>내 강의 <FaUserCircle/></a></Link></li>
            </ul>
        </div>
    )
}

export default LectureTopNav