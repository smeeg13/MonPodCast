import CategoriesManager from "@/models/categoriesManager";
import PodcastsManager from "@/models/podcastsManager";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Logging to see the request
  console.log("body: ", body);
  const podManager = new PodcastsManager();
  const catManager = new CategoriesManager();

  const newPodcast = {
    name: body.name,
    description: body.description ?? "",
    url: body.url ?? "",
    date: body.date ,
    duration: body.duration ? '' : 0,
    tags: body.tags,
    image: body.image ? '' : "https://source.unsplash.com/random/200x100?sig=1",
  };

  const newCategory = {
    name: body.nameCat,
  };

  try {
    const result = await podManager.addPodcast(newPodcast);
    if (result.insertedId) {
      // Found the name.
      // Sends a HTTP success code
      res
        .status(200)
        .json({ data: `New Podcaste Added with id ; ${result.insertedId} ` });
    } else {
      return res
        .status(400)
        .json({ data: `Couldn't add the podcast ; ${body.name} ` });
    }
  } catch (error) {
    // Sends a HTTP bad request error code
    return res
      .status(400)
      .json({ data: `Couldn't add the podcast ; ${body.name} ` });
  }
}
