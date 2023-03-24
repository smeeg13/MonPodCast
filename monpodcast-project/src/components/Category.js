import { useState } from "react";
import PodcastList from "./PodcastList";
import { Typography } from "@material-ui/core";
import { MdPlayCircleOutline } from "react-icons/md";
import styles from "../styles/Category.module.css";

const Category = ({ name, podcasts, handlePlayClick }) => {
  return (
    <div className={styles.categoryWrapper}>
      <Typography variant="h4" className={styles.categoryTitle}>
        {name}
      </Typography>
      <PodcastList podcasts={podcasts} handlePlayClick={handlePlayClick} />
    </div>
  );
};

export default Category;
