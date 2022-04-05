import ReactPlayer from 'react-player/lazy';
import styles from "../../styles/Lecture.module.scss"
import axios from "axios";
import {SERVER_URL} from "../../data/global";

const Video = ({title, url, id, videoId}) => {
    const handleVideo = () => {
        axios.post(`${SERVER_URL}/class/done/video`, {
            classId: id,
            contentId: videoId
        }, {withCredentials: true})
            .then(response => {
                if(response.data.result){
                    alert("수강완료!")
                }
            })
    }
    return (
        <>
            <h1 className={styles.lectureVideoTitle}>{title}</h1>
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={url}    // 플레이어 url
                    width='800px'         // 플레이어 크기 (가로)
                    height='500px'        // 플레이어 크기 (세로)
                    playing={false}        // 자동 재생 off
                    muted={false}          // 자동 재생 off
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    // poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                    onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                />
            </div>
        </>
    )
}

export default Video;