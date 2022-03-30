import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
const LectureCard = (dummy) => {
    return (
        <Card sx={{maxWidth: 252}}>
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
        </Card>
    )
}

export default LectureCard