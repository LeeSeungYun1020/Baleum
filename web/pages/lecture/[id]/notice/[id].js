import {useRouter} from "next/router";
import {useEffect} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../../data/global";

const notice = () => {
    const router = useRouter();
    const {id} = router.query // 공지사항 id
    return (
        <>
            하이하이
        </>
    )
}

export default notice()