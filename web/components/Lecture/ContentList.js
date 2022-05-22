import styles from "../../styles/Lecture.module.scss"
import React from "react";
const ContentList = ({countList, onChange, title, url, disable}) => {
    return (
        countList && countList.map((item, index) => (
            <div key={index} className={styles.contentListComponent}>
                <form>
                    <label className={styles.contentLabel}>강의 목록{index + 1}</label>
                    <input type={"text"} onChange={onChange} value={title} name={"title"} disabled={!disable} placeholder={"컨텐츠 명"}/>
                    <input type={"text"} onChange={onChange} value={url} name={"url"} disabled={!disable} placeholder={"컨텐츠 URL"}/>
                </form>
            </div>
        ))
    )
}

export default ContentList;