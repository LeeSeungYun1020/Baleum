import styles from "../../styles/Block.module.scss"
import React from "react";

const BlockComponent = (content) => {
    return (
        <div className={styles.block}>
            <div className={styles.blockComponent}><p>{content.content.score}</p></div>
            <p>{content.content.date}</p>
        </div>
    )
}

export default BlockComponent