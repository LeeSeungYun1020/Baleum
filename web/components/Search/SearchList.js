import styles from "../../styles/Search.module.scss"
import SearchLectureCard from "./SearchLectureCard";
import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../../data/global";
import axios from "axios";
import Loading from "../Loading";

const SearchList = ({id}) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false); // 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setTimeout(async () => {
                    console.log(id);
                    if (id) {
                        const response = await axios.get(`${SERVER_URL}/class/search/${id}`, {withCredentials: true});
                        if (response.data[0]) {
                            setItem(response.data);
                        } else {
                            setItem();
                        }
                    } else {
                        const response = await axios.get(`${SERVER_URL}/class/all`, {withCredentials: true});
                        setItem(response.data);
                    }
                }, 500
            )
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[id]);

    if(loading) {
        return <Loading/>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <div className={styles.searchList}>
            {item[0].result ? item.map((item, index) => <SearchLectureCard lecture={item} key={index}/>) : <h3>검색 결과가 존재하지 않습니다.</h3>}
        </div>
    )
}

export default SearchList