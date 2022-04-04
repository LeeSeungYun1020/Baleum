import styles from "../../styles/Users.module.scss";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import {useContext} from "react";
import {LoginContext} from "../../pages/_app";

const SignOutBox = () => {
    const {setIsLogin, setId, setPw} = useContext(LoginContext)
    const click = () => {
        axios.post(`${SERVER_URL}/users/signout`, {}, {withCredentials: true})
            .then (response => {
                if(response.data.result) {
                    setIsLogin(false);
                    setId(null);
                    setPw(null);
                    localStorage.clear()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={styles.mainSignInBox}>
            <div>
                <button onClick={click}>로그아웃</button>
            </div>
        </div>
    )
}
export default SignOutBox