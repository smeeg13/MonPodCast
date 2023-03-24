import { makeStyles } from "@material-ui/styles";
import Category from "../components/Category";
import PodcastsManager from "../models/podcastsManager";
import { theme } from "../../utils/theme";
import { useState } from "react";
import Player from "../components/Player";
import CategoriesManager from "../models/categoriesManager";

export async function getServerSideProps(context) {
  const podcasts = new PodcastsManager();
  const categories = new CategoriesManager();


  const podList = await podcasts.getAllPodcasts();
  const catList = await categories.getAllCategories();

  return {
    props: { podcasts: podList, categories: catList },
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

export default function Home({ podcasts,categories, handlePlayClick }) {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      <div
        className={classes.categoryContainer}
        id="category-container"
        style={{ marginTop: 100 }}
      >
       {categories.map(category => {
          const categoryPodcasts = podcasts.filter(podcast => podcast.categoryId === category.id);
          return <Category key={category.id} name={category.name} podcasts={categoryPodcasts} handlePlayClick={handlePlayClick} />;
        })}
      </div>
    </div>
  );
}
