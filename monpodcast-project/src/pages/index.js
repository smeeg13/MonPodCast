import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Category from "../components/Category";

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: theme.spacing(2, 0),
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

export default function Home() {
  const classes = useStyles();
  const podcasts = [
    {
      id: 1,
      title: "Podcast 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/200x100?sig=1",
    },
    {
      id: 2,
      title: "Podcast 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://source.unsplash.com/random/200x100?sig=2",
    },
    {
      id: 3,
      title: "Podcast 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/200x100?sig=3",
    },
    {
      id: 4,
      title: "Podcast 4",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://source.unsplash.com/random/200x100?sig=4",
    },
    {
      id: 5,
      title: "Podcast 5",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://source.unsplash.com/random/200x100?sig=5",
    },
    // Add more podcasts
  ];

  return (
    <div
      className={classes.categoryContainer}
      id="category-container"
      style={{ marginTop: 100 }}
    >
      <Category
        name="Category 1"
        podcasts={podcasts}
        style={{ overflowX: "auto" }}
      />
      <Category name="Category 2" podcasts={podcasts} />
      <Category name="Category 3" podcasts={podcasts} />
    </div>
  );
}
