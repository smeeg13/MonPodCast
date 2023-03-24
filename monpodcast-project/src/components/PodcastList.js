import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { MdPlayCircleOutline } from "react-icons/md";
import styles from "../styles/PodcastList.module.css";
import HorizontalScrollContainer from "./HorizontalScrollContainer";

const PodcastList = ({ podcasts, handlePlayClick }) => {
  return (
    <HorizontalScrollContainer spacing={2}>
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
              onClick={() => {
                console.log(
                  "PodcastList playButton podcastName:",
                  podcast.name
                );
                handlePlayClick(podcast.url, podcast.name);
              }}
              className={styles.playButton}
            >
              <MdPlayCircleOutline size={32} color="black" />
            </button>
          </Card>
        </Grid>
      ))}
    </HorizontalScrollContainer>
  );
};

export default PodcastList;
