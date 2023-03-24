import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";
import CategoriesManager from "../models/categoriesManager";
import PodcastsManager from "../models/podcastsManager";
import React, { useState } from "react";
import PodcastList from "../components/PodcastList";
import styles from "../styles/Category.module.css";

export async function getServerSideProps(context) {
  const podcasts = new PodcastsManager();
  const categories = new CategoriesManager();

  const podList = await podcasts.getAllPodcasts();
  const catList = await categories.getAllCategories();

  return {
    props: { podcasts: podList, categories: catList },
  };
}

export default function CategoriesPage({
  podcasts,
  categories,
  handlePlayClick,
}) {
  const [podForCat, setPodForCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (catId, catName) => {
    setPodForCat(podcasts.filter((podcast) => podcast.categoryId === catId));
    setSelectedCategory(catName);
  };

  return (
    <>
      <Head>
        <title>Categories Page</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              button={true}
              onClick={() => handleClick(category.id, category.name)}
            >
              {category.name}
            </ListItem>
          ))}
        </List>
        <br />
        <Typography variant="h4" className={styles.categoryTitle}>
          {selectedCategory}
        </Typography>
        {podForCat.length === 0 ? (
          <p>Choose the category you want</p>
        ) : (
          <PodcastList podcasts={podForCat} handlePlayClick={handlePlayClick} />
        )}
      </Container>
    </>
  );
}
