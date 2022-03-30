const MyLectureComponenet = ({lecture}) => {
    return (
        <>
            <h1>강의명: {lecture.title}</h1>
            <h2>강의자: {lecture.teacher}</h2>
            <h2>강의기간: {lecture.time}</h2>
            <h2>진도율: {lecture.percent}</h2>
            {lecture.complete} && <button>수료증</button>
        </>
    )
}

export default MyLectureComponenet