import ReactPlayer from 'react-player/lazy';
import styles from "../../styles/Lecture.module.scss"
const Video = ({title}) => {
    return (
        <>
            <h1 className={styles.lectureVideoTitle}>{title}</h1>
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}    // 플레이어 url
                    width='800px'         // 플레이어 크기 (가로)
                    height='500px'        // 플레이어 크기 (세로)
                    playing={false}        // 자동 재생 off
                    muted={false}          // 자동 재생 off
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                    onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                />
            </div>
        </>
    )
}

export default Video;