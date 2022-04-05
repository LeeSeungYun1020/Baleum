import BlockComponent from "./BlockComponent";
import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../pages/_app";
import axios from "axios";
import {SERVER_URL} from "../../data/global";
import Loading from "../Loading";

const BlockList = (classId) => {
    const {id} = useContext(LoginContext)
    const [block, setBlock] = useState(null);
    const [loading, setLoading] = useState(false); // 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/class/process/${classId.userId||id}/${classId.classId}`, {withCredentials: true});
                // userId가 있으면 그거, 없으면 사용자 id로
                // console.log(response.data)
                setBlock(response.data);
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    if(loading) {
        return <Loading/>
    }
    // 아직 block이 설정되지 않았을 때
    if (!block) {
        return null;
    }
    return (
        <>
            {block[0].result ? block.map(contents => <BlockComponent content={contents}/>) : <p>강의를 수강하여 블록을 완성해보세요!</p>}
        </>
    )
}

export default BlockList