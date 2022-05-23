import {useRouter} from "next/router";
import Head from "next/head";
import Layout, {siteTitle} from "../../../../components/layout";
import styles from "../../../../styles/Lecture.module.scss";
import {BsImage} from "react-icons/bs";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import {SERVER_URL} from "../../../../data/global";

const update = () => {
    const router = useRouter();
    const {lectureUpdate} = router.query;
    if(!lectureUpdate) {
        return <></>
    }
    const lecture = JSON.parse(lectureUpdate);
    const [image, setImage] = useState(lecture.image);
    const [lectureTitle, setLectureTitle] = useState(lecture.name);
    const [category, setCategory] = useState(lecture.category);
    const [detail, setDetail] = useState(lecture.detail); // 강의 요약
    const getFiles = (files) => {
        if (files) {
            setImage(files.base64.split("base64,")[1]);
        }
    }
    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    }
    const onTitleChange = (e) => {
        setLectureTitle(e.target.value);
    }

    const onDetailChange = (e) => {
        setDetail(e.target.value);
    }
    const onLectureSubmit = (e) => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/class/update/${lecture.id}`, {
            name: lectureTitle,
            detail: detail,
            category: category,
            image: image
        }, {withCredentials: true})
            .then(response => {
                if(response.data.result){
                    alert("강의정보가 수정되었습니다.");
                    router.push('/lecture/my')
                }
                else {
                    alert("잠시후 다시 시도해주세요.");
                }
            })
    }

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <div className={styles.createLecturePage}>
                    <div className={styles.createLectureDiv}>
                        <h1>강의 정보 입력</h1>
                        <p>강의를 잘 표현하는 제목과 이미지 등록</p>
                    </div>
                    <div className={styles.createLectureComponent}>
                        <div className={styles.createPreviewImage}>
                            <h2>커버 이미지</h2>
                            {image ? <img src={"data:image/png;base64," + image} alt={"커버 이미지"}/> : <div><BsImage color={"#f1f1f1"} style={{width: "52px", height: "auto"}}/></div>}
                            {<FileBase64 onDone={getFiles} id={"image"} name={"image"}/>}
                        </div>

                        <div>
                            <form onSubmit={onLectureSubmit}>
                                <div className={styles.createComponentDiv}>
                                    <h2>강의명</h2>
                                    <input className={styles.myLectureCreateInput} type={"text"} id={"LectureTitle"} required onChange={onTitleChange} placeholder={"강의명"} value={lectureTitle}/>
                                </div>
                                <div className={styles.createComponentDiv}>
                                    <h2>강의 요약</h2>
                                    <textarea id={"detail"} className={styles.myLectureCreateInput} required onChange={onDetailChange} placeholder={"강의 요약"} value={detail}/>
                                </div>
                                <div className={styles.createComponentDiv}>
                                    <h2>카테고리 분류</h2>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                                        <Select
                                            id={category}
                                            value={category}
                                            label="카테고리"
                                            onChange={onCategoryChange}
                                        >
                                            <MenuItem value={"글쓰기"}>글쓰기</MenuItem>
                                            <MenuItem value={"디자인"}>디자인</MenuItem>
                                            <MenuItem value={"컴퓨터 과학"}>컴퓨터 과학</MenuItem>
                                            <MenuItem value={"투자"}>투자</MenuItem>
                                            <MenuItem value={"프로그래밍"}>프로그래밍</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <input className={styles.createSubmit} type={"submit"} value={"강의 등록"}/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default update;