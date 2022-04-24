import React, {useEffect, useState} from "react";
import styles from "../../styles/Search.module.scss";
import SearchNav from "../../components/Search/SearchNav";
import SearchList from "../../components/Search/SearchList";
import {useRouter} from "next/router";
import Layout, {siteTitle} from "../../components/layout";
import Head from "next/head";
import SearchComponent from "../../components/Search/SearchComponent";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import Loading from "../../components/Loading";

const Search = () => {
    const router = useRouter()
    const {id} = router.query;
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(false); // 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/class/category/list`,{ withCredentials: true });
                if(response.data[0].result)
                    setCategories(response.data);
                else {
                    setCategories();
                }
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    if(loading) {
        return <Loading/>
    }
    if (!categories) {
        return null;
    }
    return (
        <Layout search>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <SearchComponent/>
                <div className={styles.searchPage}>
                    <SearchNav categories={categories}/>
                    <SearchList id={id}/>
                </div>
            </section>
        </Layout>
    )
}

export default Search