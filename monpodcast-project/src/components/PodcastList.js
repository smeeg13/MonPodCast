import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { MdPlayCircleOutline } from "react-icons/md";

const PodcastList = ({ podcasts }) => {
  return (
    <Grid container spacing={2}>
      {podcasts.map((podcast, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card>
            <CardMedia component="img" src={podcast.image} />
            <CardContent>
              <Typography variant="h6">{podcast.title}</Typography>
              <Typography variant="body2">{podcast.description}</Typography>
            </CardContent>
            <MdPlayCircleOutline size={32} color="primary" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PodcastList;
