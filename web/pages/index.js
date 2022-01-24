import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout";

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <h1>Home</h1>
            </section>
        </Layout>
    )
}
