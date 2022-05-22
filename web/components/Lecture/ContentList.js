import styles from "../../styles/Lecture.module.scss"
import React from "react";
const ContentList = ({countList, onChange, title, url}) => {
    return (
        countList && countList.map((item, index) => (
            <div key={index} className={styles.contentListComponent}>
                <form>
                    <label>강의 목록{index + 1}</label>
                    <input type={"text"} onChange={onChange} value={title} name={"title"}/>
                    <input type={"text"} onChange={onChange} value={url} name={"url"}/>
                </form>
            </div>
        ))
    )
}

export default ContentList;