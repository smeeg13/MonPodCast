import UploadForm from "@/components/UploadForm";
import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CategoriesManager from "../models/categoriesManager";
import SeriesManager from "../models/seriesManager";
import UsersManager from "@/models/usersManager";

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

export async function getServerSideProps(context) {
  const categories = new CategoriesManager();
  const resultCategories = await categories.getAllCategories();

  const series = new SeriesManager();
  const resultSeries = await series.getAllSeries();

  const users = new UsersManager();

  // get the authenticated user from the request object
  const  user = await users.authenticate();

  console.log(user);
    // user is passed to this page as a prop from the server
    if (user == null) {
      // if there is no user, redirect to the login page
      return {
        redirect: {
          destination: '/loginScreen?message=Please+log+in+to+access+upload+page.',
          permanent: false,
        },
      };
    }

  return {
    props: {
      categories: resultCategories,
      series: resultSeries,
      user: user
    },
  };
}

export default function UploadPage({ categories, series, user }) {
  const classes = useStyles();
  console.log(user);



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
        <Typography variant="h4" gutterBottom>
          Enter your podcast information
        </Typography>
        <UploadForm categories={categories} series={series} user={user} />
      </Container>
    </div>
  );
}
