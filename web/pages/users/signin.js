import Layout, {siteTitle} from "/components/layout";
import styles from "/styles/Users.module.scss"
import Head from "next/head";
import {SERVER_URL} from "../../data/global";
import axios from "axios";
import {useState} from "react";

const signin = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const submit = e => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/users/signin`, {
            id: id,
            pw: pw
        }, {withCredentials: true})
            .then (response => {
                console.log(response)
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
                               autoComplete={"email"} placeholder={"ID"} onChange={onIdChange}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"password"} id={"pw"} name={"pw"} required
                               minLength={"4"}
                               autoComplete={"password"} placeholder={"Password"} onChange={onPwChange}/>
                    </div>
                    <input className={styles.textBox} type={"submit"} value={"로그인"}/>
                </form>
            </section>
        </Layout>
    )
}

export default signin