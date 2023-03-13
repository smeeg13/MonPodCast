import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { MdPlayCircleOutline } from "react-icons/md";
import styles from "../styles/PodcastList.module.css";

const PodcastList = ({ podcasts, handlePlayClick }) => {
  return (
    <Grid container spacing={2}>
      {podcasts.map((podcast, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card>
            <CardMedia component="img" src={podcast.image} />
            <CardContent>
              <Typography variant="h6">{podcast.name}</Typography>
              <Typography variant="body1">
                {podcast.date} -- {podcast.duration}
              </Typography>
              <Typography variant="body2">{podcast.description}</Typography>
            </CardContent>
            <button
              onClick={() => handlePlayClick(podcast.url)}
              className={styles.playButton}
            >
              <MdPlayCircleOutline size={32} color="primary" />
            </button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PodcastList;
