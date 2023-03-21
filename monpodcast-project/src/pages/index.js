import { makeStyles } from "@material-ui/styles";
import Category from "../components/Category";
import PodcastsManager from "../models/podcastsManager";
import { theme } from "../../utils/theme";
import { useState } from "react";
import Player from "../components/Player";

export async function getServerSideProps(context) {
  const podcasts = new PodcastsManager();

  const result = await podcasts.getAllPodcasts();

  return {
    props: { podcasts: result },
  };
}

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",

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
  pageWrapper: {
    marginBottom: "100px",
  },
}));

export default function Home({ podcasts, handlePlayClick }) {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <div
        className={classes.categoryContainer}
        id="category-container"
        style={{ marginTop: 100 }}
      >
        <Category
          name="Category 1"
          podcasts={podcasts}
          handlePlayClick={handlePlayClick}
        />
        <Category
          name="Category 2"
          podcasts={podcasts}
          handlePlayClick={handlePlayClick}
        />
        <Category
          name="Category 3"
          podcasts={podcasts}
          handlePlayClick={handlePlayClick}
        />
      </div>
    </div>
  );
}
