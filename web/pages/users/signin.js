import Layout, {siteTitle} from "/components/layout";
import styles from "/styles/Users.module.scss"
import Head from "next/head";
import {SERVER_URL} from "../../data/global";
import axios from "axios";
import {useContext} from "react";
import {LoginContext} from "../_app";
import {useRouter} from 'next/router'

const signin = () => {
    const router = useRouter()
    const {id, pw, setIsLogin, setId, setPw, setCurrentUserId} = useContext(LoginContext)
    const submit = e => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/users/signin`, {
            id: id,
            pw: pw
        }, {withCredentials: true})
            .then (response => {
                // console.log(response)
                if(response.data.result) {
                    setId(id);
                    setPw(pw);
                    setIsLogin(true);
                    setCurrentUserId(id);
                    sessionStorage.setItem("isLogin", true);
                    sessionStorage.setItem("id", id);
                    sessionStorage.setItem("pw", pw);
                    router.push('/'); // 홈으로 이동
                }
                else {
                    alert("이메일과 비밀번호를 다시 확인해주세요.")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onIdChange = e => {
        setId(e.target.value);
    }

    const onPwChange = e => {
        setPw(e.target.value);
    }

    return (
        <Layout signin>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={styles.signIn}>
                <h1>로그인</h1>
                <form onSubmit={submit}>
                    <div>
                        <input className={styles.textBox} type={"email"} id={"id"} name={"id"} required minLength={"4"}
                               autoComplete={"email"} placeholder={"이메일"} onChange={onIdChange}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"password"} id={"pw"} name={"pw"} required
                               minLength={"4"}
                               autoComplete={"password"} placeholder={"비밀번호"} onChange={onPwChange}/>
                    </div>
                    <input className={styles.submitBox} type={"submit"} value={"로그인"}/>
                </form>
            </section>
        </Layout>
    )
}

export default signin