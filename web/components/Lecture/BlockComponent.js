import styles from "../../styles/Block.module.scss"
import React, {useState} from "react";
import {BsArrowRight} from "react-icons/bs";

const BlockComponent = (content) => {
    const [hide, setHide] = useState(true);
    return (
        <>
        <div className={styles.block} onMouseEnter={() => setHide(false)} onMouseLeave={()=>setHide(true)}>
            {/*{console.log(content)}*/}
            <p>{content.content.title}</p>
            <div className={styles.blockComponent}><p>{content.content.type}</p><p>{content.content.score}</p></div>
            <p>{content.content.date.split("T")[0]}</p>
            {!hide && <p className={styles.blockHiddenInfo}>{content.content.feedback}</p>}
        </div>
        <BsArrowRight color={"#ffffff"} style={{margin: "auto 20px auto 0"}}/>
        </>
    )
}

export default BlockComponent