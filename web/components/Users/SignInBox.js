import Link from "next/link"
import styles from "../../styles/Users.module.scss";

const SignInBox = () => {
    return (
        <div className={styles.mainSignInBox}>
            <h2>안녕하세요?</h2>
            <Link href="/"><a>로그인</a></Link>
            <Link href="/"><a>회원가입</a></Link>
        </div>
    )
}
export default SignInBox