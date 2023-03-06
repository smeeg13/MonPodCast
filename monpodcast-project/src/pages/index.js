import { makeStyles, ThemeProvider, createMuiTheme,  } from "@material-ui/styles";
import Category from "../components/Category";
import clientPromise from '../../lib/mongodb'

export async function getServerSideProps(context) {

    const client = await clientPromise
    const db =  client.db(process.env.MONGODB_DB)
    const data = await db.collection("podcasts").find({}).limit(5).toArray();
    console.log(data)
    
    const properties = JSON.parse(JSON.stringify(data));
    const filtered = properties.map((property) =>{
      const duration = JSON.parse(JSON.stringify(property.duration));

      return {
        _id: property._id,
        name: property.name,
        description: property.description,
        date: property.date,
        duration: duration.$numberDecimal,
        image: "https://source.unsplash.com/random/200x100?sig=1"
      }      
    })

    return {
      props: { podcasts: filtered },
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
