import styles from "../../styles/Users.module.scss";
import {useRouter} from "next/router";

const SignInBox = () => {
    const router = useRouter()
    const onSigninClick = () => {
        router.push('/users/signin')
    }
    const onSignupClick = () => {
        router.push('/users/signup')
    }
    return (
        <div className={styles.mainSignInBox}>
            <p>로그인/회원가입</p>
            <button onClick={onSigninClick}>
                로그인
            </button>
            <button onClick={onSignupClick}>
                회원가입
            </button>
        </div>
    )
}
export default SignInBox