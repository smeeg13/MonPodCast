const { connectToDb } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
const dayjs = require("dayjs");
import { PODCASTS_COLL } from "../../utils/constants";

export default class PodcastsManager {
  client;

  constructor() {
    this.client = connectToDb();
  }

  #getCollection = async () => {
    try {
      await this.client.connect();
      const db = this.client.db(process.env.MONGODB_DB);
      const Podcasts = db.collection(PODCASTS_COLL);
      return Podcasts;
    } catch (err) {
      console.error("MongoDb Connection error", err);
      await client.close();
      return null;
    }
  };

  getAllPodcasts = async () => {
    console.log(`Podcasts.js > getPodcasts`);

    const Podcasts = await this.#getCollection();
    let res = await Podcasts.find({}).toArray();

    res = res.map((podcast, index) => {
      console.log(podcast);
      const stringDuration = podcast.duration ?? "";
      const durationValue = parseFloat(stringDuration);

      const newDate = dayjs(podcast.date).format("DD/MM/YYYY");
      return {
        id: podcast._id.toHexString(),
        name: podcast.name,
        description: podcast.description ?? "",
        url: podcast.url ?? "",
        date: newDate ?? "",
        duration: durationValue,
        tags: podcast.tags ?? [],
        image:
          podcast.image ??
          `https://source.unsplash.com/random/200x100?sig=${index + 1}`,
      };
    });

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
    let res = await Podcasts.findOne({ name: namepodcast });

    res = res.map((podcast) => {
      const newDate = dayjs(podcast.date).format("DD/MM/YYYY");
      const stringDuration = podcast.duration ?? "";
      const durationValue = parseFloat(stringDuration);

      return {
        id: podcast._id.toHexString(),
        name: podcast.name,
        description: podcast.description ?? "",
        url: podcast.url ?? "",
        date: newDate ?? "",
        duration: durationValue,
        tags: podcast.tags ?? [],
        image:
          podcast.image ?? "https://source.unsplash.com/random/200x100?sig=1",
      };
    });

    if (res.length > 0) {
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
