import styles from "../styles/Home.module.scss";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {dummyLecture} from "../data/dummyLecture";

const HomeLectureList = () => {
    return (
        <div className={styles.lectureList}>
            {
                dummyLecture.map((dummy, index)=> <Card key = {index} sx={{ maxWidth: 252 }}>
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