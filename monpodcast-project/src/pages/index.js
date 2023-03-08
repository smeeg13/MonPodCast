import { makeStyles, ThemeProvider, createMuiTheme,  } from "@material-ui/styles";
import Category from "../components/Category";
import PodcastsManager from "./models/podcastsManager";
export async function getServerSideProps(context) {

  const podcasts = new PodcastsManager();

  const result = await podcasts.getAllPodcasts();


    return {
      props: { podcasts: result },
    }
}
const theme = createMuiTheme;

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
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

export default function Home({
  podcasts
}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
