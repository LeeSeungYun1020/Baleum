import Layout, {siteTitle} from "/components/layout";
import styles from "/styles/Users.module.scss"
import {url} from "/data/api"
import Head from "next/head";

const signup = () => {
    return (
        <Layout signin>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={styles.signIn}>
                <h1>회원가입</h1>
                <form action={url.signup} method="post">
                    <div>
                        <input className={styles.textBox} type={"email"} id={"id"} name={"id"} required minLength={"4"}
                               autoComplete={"name"} placeholder={"성함"}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"email"} id={"id"} name={"id"} required minLength={"4"}
                               autoComplete={"email"} placeholder={"ID"}/>
                    </div>
                    <div>
                        <input className={styles.textBox} type={"password"} id={"pw"} name={"pw"} required
                               minLength={"4"}
                               autoComplete={"password"} placeholder={"Password"}/>
                    </div>
                    <input type={"hidden"} name={"failureUrl"} value={"/users/signin"}/>
                    <input className={styles.textBox} type={"submit"} value={"회원가입"}/>
                </form>
            </section>
        </Layout>
    )
}

export default signup