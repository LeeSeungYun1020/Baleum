import Layout, {siteTitle} from "/components/layout";
import styles from "/styles/Users.module.scss"
import Head from "next/head";
import {useRouter} from "next/router";
import {useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../data/global";

const signup = () => {
    const router = useRouter();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [phone, setPhone] = useState("");

    const submit = e => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/users/signup`, {
            id: id,
            pw: pw,
            name: name,
            detail: detail,
            phone: phone
        }, {withCredentials: true})
            .then (response => {
                // console.log(response)
                if(response.data.result) {
                    router.push('/users/signin'); // 로그인으로 이동
                }
                else {
                    alert("이메일을 다시 입력해주세요.")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const idChange = e => {
        setId(e.target.value);
    }
    const pwChange = e => {
        setPw(e.target.value);
    }
    const confirmPwChange = e => {
        setConfirmPw(e.target.value);
    }
    const nameChange = e => {
        setName(e.target.value);
    }
    const detailChange = e => {
        setDetail(e.target.value);
    }
    const phoneChange = e => {
        setPhone(e.target.value);
    }

    return (
        <Layout signin>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={styles.signIn}>
                <h1>회원가입</h1>
                <form onSubmit={submit}>
                    <div>
                        <input className={styles.textBox} type={"text"} id={"name"} name={"name"} required minLength={"2"}
                               autoComplete={"name"} placeholder={"성함"} onChange={nameChange}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"email"} id={"id"} name={"id"} required minLength={"4"}
                               autoComplete={"email"} placeholder={"ID"} onChange={idChange}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"password"} id={"pw"} name={"pw"} required
                               minLength={"4"}
                               autoComplete={"password"} placeholder={"Password"} onChange={pwChange}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"password"} id={"pw"} name={"pw"} required
                               minLength={"4"}
                              placeholder={"Password Confirm"} onChange={confirmPwChange}/>
                    </div>
                    {pw !== confirmPw && <div><p>비밀번호가 일치하지 않습니다.</p></div>}
                    <div>
                        <input className={styles.textBox} type={"text"} id={"intro"} name={"detail"} required minLength={"4"}
                               placeholder={"한 줄 소개"} onChange={detailChange}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"text"} id={"phone"} name={"phone"} required minLength={"4"}
                               placeholder={"000-0000-0000"} onChange={phoneChange}/>
                    </div>
                    <input className={styles.textBox} type={"submit"} value={"회원가입"}/>
                </form>
            </section>
        </Layout>
    )
}

export default signup