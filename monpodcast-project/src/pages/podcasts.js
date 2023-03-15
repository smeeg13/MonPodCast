import { Typography } from "@material-ui/core";
import PodcastList from "../components/PodcastList";
import PodcastsManager from "../models/podcastsManager";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  podcastsContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    // padding: useTheme().spacing(2, 0),
    "&::-webkit-scrollbar": {
      height: "0.5rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "0.25rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
      borderRadius: "0.25rem",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#ccc",
    },
  },
}));

export async function getServerSideProps(context) {

  const podcasts = new PodcastsManager();

  const result = await podcasts.getAllPodcasts();

    return {
      props: { podcasts: result },
    }
}
const Podcasts = ({
  podcasts
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.podcastsContainer}
      id="podcasts-container"
      style={{ marginTop: 100 }}
      >
      <Typography variant="h4" gutterBottom>
        All Podcasts
      </Typography>
      <PodcastList podcasts={podcasts} />
    </div>
  );
};

export default Podcasts;
