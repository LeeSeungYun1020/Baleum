import styles from '../styles/layout.module.scss'
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <div className={styles.loadingPage}>
            <CircularProgress />
            <h3>로딩중...</h3>
        </div>
    )
}

export default Loading