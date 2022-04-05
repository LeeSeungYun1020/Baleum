import styles from "../../styles/Block.module.scss"
import React from "react";

const BlockToolTip = ({main, description}) => {
    return (
        <div className={styles.toolTip}>
            {main}
            <div className={styles.toolTipText}>{description}</div>
        </div>
    )
}

export default BlockToolTip