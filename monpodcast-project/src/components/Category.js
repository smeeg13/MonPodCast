import { Typography } from "@material-ui/core";
import PodcastList from "./PodcastList";

const Category = ({ name, podcasts }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <PodcastList podcasts={podcasts} />
    </>
  );
};

export default Category;
