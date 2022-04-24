import styles from "../../styles/Block.module.scss"
import React from "react";
import {BsArrowRight} from "react-icons/bs";
import BlockToolTip from "./BlockToolTip"

const BlockComponent = (content) => {
    const mainContents = <div className={styles.block}>
        <p>{content.content.title}</p>
        <div className={styles.blockComponent}><p>{content.content.type}</p><p>{content.content.score}</p></div>
        <p>{content.content.date.split("T")[0].replaceAll('-', '/')}</p>
    </div>
    const desc = `${content.content.feedback}`
    return (
        <div className={styles.blockComponentList}>
            <BlockToolTip main={mainContents} description={desc}/>
            <BsArrowRight color={"#331B3F"} style={{display: "block", margin: "auto 20px auto 0"}}/>
        </div>
    )
}

export default BlockComponent