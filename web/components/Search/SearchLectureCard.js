import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import styles from "../../styles/Search.module.scss"
import {useRouter} from "next/router";

const HomeLectureCard = ({lecture}) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`/lecture/${lecture.id}`)
    }
    return (
        <Card sx={{width: 252}} className={styles.lectureCard} onClick={onClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={"data:image/png;base64,"+ lecture.image}
                    alt="강의 사진"
                />
                {/*{console.log(lecture)}*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" height="32px"
                                style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontWeight: "600", fontSize: "1.2rem"}}>
                        {lecture.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" height="60px" style={{overflow: "hidden"}}>
                        {lecture.detail}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {lecture.teacher}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default HomeLectureCard