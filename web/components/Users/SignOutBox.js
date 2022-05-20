import styles from "../../styles/Users.module.scss";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import {useContext} from "react";
import {LoginContext} from "../../pages/_app";

const SignOutBox = () => {
    const {setIsLogin, setId, setPw, setCurrentUserId} = useContext(LoginContext)
    const click = () => {
        axios.post(`${SERVER_URL}/users/signout`, {}, {withCredentials: true})
            .then (response => {
                if(response.data.result) {
                    setIsLogin(false);
                    setId(null);
                    setPw(null);
                    setCurrentUserId(null);
                    sessionStorage.clear()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={styles.mainSignInBox}>
            <p>로그아웃</p>
            <button onClick={click}>로그아웃</button>
        </div>
    )
}
export default SignOutBox