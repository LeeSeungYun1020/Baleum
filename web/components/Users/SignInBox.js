import Link from "next/link"
import styles from "../../styles/Users.module.scss";

const SignInBox = () => {
    return (
        <div className={styles.mainSignInBox}>
            <h2>안녕하세요?</h2>
            <div>
                <Link href="/users/signin"><a>로그인</a></Link>
            </div>
            <div>
                <Link href="/users/signup"><a>회원가입</a></Link>
            </div>
        </div>
    )
}
export default SignInBox