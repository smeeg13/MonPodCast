import PodcastList from "./PodcastList";
import { Typography } from "@material-ui/core";
import styles from "../styles/Category.module.css";

const Series = ({ name, podcasts, handlePlayClick }) => {
    return (
        <div className={styles.categoryWrapper}>
            <Typography variant="h4" className={styles.categoryTitle}>
                {name}
            </Typography>
            <PodcastList podcasts={podcasts} handlePlayClick={handlePlayClick} />
        </div>
    );
};

export default Series;