import PodcastsManager from "./models/podcastsManager";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export async function getStaticProps() {
  const podcasts = new PodcastsManager();
  const result = await podcasts.getAllPodcasts();

  return {
    props: { podcasts: result },
  };
}

export default function Podcasts({ podcasts }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="podcasts list">
        {podcasts.map((podcast) => (
          <ListItem button key={podcast.id}>
            <ListItemText primary={podcast.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
