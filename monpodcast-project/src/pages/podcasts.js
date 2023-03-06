import { Typography } from "@material-ui/core";
import PodcastList from "../components/PodcastList";
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
const Podcasts = ({
  podcasts
}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        All Podcasts
      </Typography>
      <PodcastList podcasts={podcasts} />
    </>
  );
};

export default Podcasts;
