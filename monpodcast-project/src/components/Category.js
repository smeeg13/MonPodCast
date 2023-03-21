import { useState } from "react";
import PodcastList from "./PodcastList";
import { Typography } from "@material-ui/core";
import { MdPlayCircleOutline } from "react-icons/md";

const Category = ({ name, podcasts, handlePlayClick }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <Typography variant="h4">{name}</Typography>
      <PodcastList podcasts={podcasts} handlePlayClick={handlePlayClick} />
    </div>
  );
};

export default Category;
