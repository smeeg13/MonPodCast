import { Typography } from "@material-ui/core";
import PodcastList from "../components/PodcastList";
import PodcastsManager from "./models/podcastsManager";

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
  return (
    <>
      <Typography variant="h4" gutterBottom>
        All Podcasts
      </Typography>
      <PodcastList podcasts={podcasts} />
    </>
  );
};

export default Podcasts;
