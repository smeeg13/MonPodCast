const { connectToDb } = require("../../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
const dayjs = require("dayjs");
import { PODCASTS_COLL } from "../../../utils/constants";

export default class PodcastsManager {
  client;

  constructor() {
    this.client = connectToDb();
    this.client.connect((err) => {
      if (err) {
        console.error("MongoDb Connection error", err);
      } else {
        console.log("MongoDB connected successfully");
      }
    });
  }

  #getCollection = async () => {
    try {
      await this.client.connect();
      const db = this.client.db(process.env.MONGODB_DB);
      const Podcasts = db.collection(PODCASTS_COLL);
      return Podcasts;
    } catch (err) {
      console.error("MongoDb Connection error", err);
      await this.client.close();
      return null;
    }
  };

  getAllPodcasts = async () => {
    console.log(`Podcasts.js > getPodcasts`);

    const Podcasts = await this.#getCollection();
    let res = await Podcasts.find(
      {},
      {
        projection: {
          _id: 0,
          name: 1,
          url: 1,
          image: "https://source.unsplash.com/random/200x100",
        },
      }
    ).toArray();

    if (res.length > 0) {
      console.log(res);
      return res;
    } else {
      console.log(`No Podcasts found`);
      return null;
    }
  };

  getPodcastByName = async (namepodcast) => {
    console.log(`Podcasts.js > getPodcasts`);

    const Podcasts = await this.#getCollection();
    let res = await Podcasts.findOne(
      { name: namepodcast },
      {
        projection: {
          _id: 0,
          name: 1,
          url: 1,
          image: "https://source.unsplash.com/random/200x100",
        },
      }
    );

    if (res) {
      console.log(res);
      return res;
    } else {
      console.log(`No podcast found`);
      return null;
    }
  };

  addPodcast = async (podcast) => {
    console.log(`podcast.js > addpodcast: ${podcast}`);

    const Podcasts = await this.#getCollection();
    return await Podcasts.insertOne(podcast);
  };

  addMultiplePodcasts = async (newPodcasts) => {
    console.log(`podcast.js > addMultiplepodcast: ${newPodcasts}`);

    const Podcasts = await this.#getCollection();
    return await Podcasts.insertMany(newPodcasts);
  };

  updatePodcast = async (id, podcast) => {
    console.log(`podcast.js > updatepodcast: ${podcast}`);

    const Podcasts = await this.#getCollection();
    return await Podcasts.updateOne(
      { _id: new ObjectId(id) },
      { $set: podcast }
    );
  };

  /*  Possible to update many doc to ensure they all have a certain field
    those which already have the fields stays same 
    and other get updated with the field putted as unknown
    
     => by using [...].updateMany({client: {$exist: false}}, {$set: {client: "Unknown"}});
*/

  deletePodcastById = async (id) => {
    console.log(`podcast.js > deletepodcast: ${id}`);

    const Podcasts = await this.#getCollection();
    const res = await Podcasts.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };

  deletePodcastByName = async (namepodcast) => {
    console.log(`podcast.js > deletepodcast: ${namepodcast}`);

    const Podcasts = await this.#getCollection();
    const res = await Podcasts.deleteOne({ name: namepodcast });
    return res.deletedCount > 0;
  };
}
