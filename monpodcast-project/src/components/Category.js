import { useState } from "react";
import PodcastList from "./PodcastList";
import { Typography } from "@material-ui/core";
import { MdPlayCircleOutline } from "react-icons/md";
import Player from "./Player";

const Category = ({ name, podcasts }) => {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const handlePlayClick = (url) => {
    setSelectedPodcast(url);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Typography variant="h4">{name}</Typography>
      <PodcastList podcasts={podcasts} handlePlayClick={handlePlayClick} />
      {selectedPodcast && (
        <Player
          audioSrc={selectedPodcast}
          podcastName={selectedPodcast}
          setSelectedPodcast={setSelectedPodcast}
        />
      )}
    </div>
  );
};

export default Category;
