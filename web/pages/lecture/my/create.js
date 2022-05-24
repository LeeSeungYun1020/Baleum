import React, {useState} from "react";
import FileBase64 from "react-file-base64";
import styles from "../../../styles/Lecture.module.scss"
import {BsImage} from "react-icons/bs";
import {AiFillPlusCircle} from "react-icons/ai";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import {SERVER_URL} from "../../../data/global";
import ContentList from "../../../components/Lecture/ContentList";
import {siteTitle} from "../../../components/layout";
import Layout from "../../../components/layout";
import Head from "next/head";
import {useRouter} from "next/router";

const create = () => {
    const router = useRouter();
    const [image, setImage] = useState();
    const [LectureTitle, setLectureTitle] = useState();
    const [category, setCategory] = useState();
    const [detail, setDetail] = useState(); // 강의 요약
    const [content, setContent] = useState({
        contentId: 0,
        title: '',
        url: '',
        type: "영상"
    }); // 강의 컨텐츠 여러개
    const [contents, setContents] = useState([]); // 강의 컨텐츠 뭉텡이
    const [classId, setClassId] = useState();
    const {title, url} = content;
    const [disable, setDisable] = useState(false);
    const [countList, setCountList] = useState([0]);
    const getFiles = (files) => {
        if (files) {
            setImage(files.base64.split("base64,")[1]);
        }
    }
    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    }
    const onAddClick = () => {
        let countArr = [...countList];
        let counter = countArr.slice(-1)[0];
        counter += 1;
        countArr.push(counter);
        setCountList(countArr);
        const content = {
            contentId: counter,
            title: title,
            url: url,
            type: "영상"
        };
        setContents(contents.concat(content));
        setContent({
            contentId: 0,
            title: '',
            url: '',
            type: "영상"
        });
    }
    const onLectureSubmit = (e) => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/class/create`, {
            name: LectureTitle,
            detail: detail,
            category: category,
            image: image
        }, {withCredentials: true})
            .then(response => {
                if(response.data.result){
                    alert("강의가 생성되었습니다.");
                    setDisable(true);
                    setClassId(response.data.classId);
                }
                else {
                    alert("잠시후 다시 시도해주세요.");
                }
            })
    }

    const onTitleChange = (e) => {
        setLectureTitle(e.target.value);
    }

    const onDetailChange = (e) => {
        setDetail(e.target.value);
    }

    const onContentsChange = (e) => {
        const {name, value} = e.target;
        setContent({
            ...content,
            [name]: value,
        })
        // console.log(name, value);
    }

    const onContentComplete = () => {
        let countArr = [...countList];
        let counter = countArr.slice(-1)[0];
        counter += 1;
        // countArr.push(counter);
        // setCountList(countArr);
        const content = {
            contentId: counter,
            title: title,
            url: url,
            type: "영상"
        };
        setContents(contents.concat(content));
        alert("강의 컨텐츠가 등록되었습니다.");
    }
    const onContentSubmit = (e) => {
        e.preventDefault();
        console.log(contents);
        axios.post(`${SERVER_URL}/class/contents/${classId}/add`, contents, {withCredentials: true})
            .then(response => {
                if(response.data.result){
                    alert("성공적으로 강의가 등록되었습니다.");
                    router.push('/lecture/my');
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
                    {!disable && <FileBase64 onDone={getFiles} id={"image"} name={"image"}/>}
                </div>

                <div>
                    <form onSubmit={onLectureSubmit}>
                        <div className={styles.createComponentDiv}>
                    <h2>강의명</h2>
                    <input className={styles.myLectureCreateInput} type={"text"} id={"LectureTitle"} required onChange={onTitleChange} placeholder={"강의명"} disabled={disable}/>
                        </div>
                        <div className={styles.createComponentDiv}>
                            <h2>강의 요약</h2>
                    <textarea id={"detail"} className={styles.myLectureCreateInput} required onChange={onDetailChange} placeholder={"강의 요약"} disabled={disable}/>
                        </div>
                        <div className={styles.createComponentDiv}>
                            <h2>카테고리 분류</h2>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" disabled={disable}>카테고리</InputLabel>
                        <Select
                            id={category}
                            value={category}
                            label="카테고리"
                            onChange={onCategoryChange} disabled={disable}
                        >
                            <MenuItem value={"글쓰기"}>글쓰기</MenuItem>
                            <MenuItem value={"디자인"}>디자인</MenuItem>
                            <MenuItem value={"컴퓨터 과학"}>컴퓨터 과학</MenuItem>
                            <MenuItem value={"투자"}>투자</MenuItem>
                            <MenuItem value={"프로그래밍"}>프로그래밍</MenuItem>
                        </Select>
                    </FormControl>
                        </div>
                        <input className={styles.createSubmit} type={"submit"} value={"강의 등록"} disabled={disable}/>
                    </form>
                </div>
            </div>
            <div className={styles.contentCreateDiv}>
                <form onSubmit={onContentSubmit}>
                    <div className={styles.contentCreateArea}>
                    <ContentList countList={countList} onChange={onContentsChange} disable={disable}/>
                    <button type={"button"} onClick={onAddClick}>
                        <AiFillPlusCircle/>추가
                    </button>
                    <button type={"button"} onClick={onContentComplete}>컨텐츠 등록 완료</button>
                    </div>
                    <div className={styles.createCompleteArea}>
                <input className={styles.createCompleteButton} type={"submit"} value={"생성 완료"}/>
                    </div>
                </form>
            </div>
        </div>
            </section>
        </Layout>
    )
}

export default create;