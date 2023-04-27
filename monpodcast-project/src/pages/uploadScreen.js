import UploadForm from "@/components/UploadForm";
import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CategoriesManager from "../models/categoriesManager";
import SeriesManager from "../models/seriesManager";

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
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

export async function getStaticProps() {
  const categories = new CategoriesManager();
  const resultCategories = await categories.getAllCategories();

  const series = new SeriesManager();
  const resultSeries = await series.getAllSeries();

  console.log(resultCategories);

  return {
    props: { categories: resultCategories, series: resultSeries },
  };
}

export default function UploadPage({ categories, series }) {
  const classes = useStyles();

  return (
    <div
      className={classes.uploadContainer}
      id="upload-container"
      style={{ marginTop: 100 }}
    >
      <Head>
        <title>Upload your Podcast</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          Enter your podcast information
        </Typography>
        <UploadForm categories={categories} series={series} />
      </Container>
    </div>
  );
}
