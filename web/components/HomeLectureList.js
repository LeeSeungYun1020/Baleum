import styles from "../styles/Home.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const dummyDatas = [
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
        {
            "title": "컴맹을 위한 강의다!!",
            "teacher": "김유미",
            "description": "도비는 자유에요 집에가고싶어요~~ 쫌 이따 튀어야지 왜냐면 도비는 자유니까",
            "src": "/img/sample-banner.jpg"
        },
    ]
const HomeLectureList = () => {
    return (
        <div className={styles.lectureList}>
            {
                dummyDatas.map((dummy, index)=> <Card sx={{ maxWidth: 252 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={dummy.src}
                            alt="강의 사진"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {dummy.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {dummy.description}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {dummy.teacher}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>)}
        </div>)
}

export default HomeLectureList