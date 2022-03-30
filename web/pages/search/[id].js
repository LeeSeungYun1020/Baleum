import React from "react";
import styles from "../../styles/Search.module.scss";
import SearchNav from "../../components/Search/SearchNav";
import SearchList from "../../components/Search/SearchList";
import {dummyCategory} from "../../data/dummyCategory";
import {useRouter} from "next/router";
import Layout, {siteTitle} from "../../components/layout";
import Head from "next/head";
import SearchComponent from "../../components/Search/SearchComponent";
const Search = () => {
    const router = useRouter()
    const {id} = router.query;
    return (
        <Layout search>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <SearchComponent />
                <div className={styles.searchPage}>
                    <SearchNav categories = {dummyCategory} />
                    <SearchList id = {id} />
                </div>
            </section>
        </Layout>
    )
}

export default Search