import PodcastsManager from "../../models/podcastsManager";
import CategoriesManager from "../../models/categoriesManager";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Logging to see the request
  console.log("body: ", body);

  //Insert the new category in DB
  const newCat = {
    name: body.nameCat,
  };
  const categories = new CategoriesManager();
  //Find if already exist

  let myCategory = await categories.getCategoryByName(newCat.name);
  if(myCategory == null){
    //create new one
    myCategory = await categories.addCategory(newCat);
    console.log('CATEGORY CREATED');
  }

    console.log('CATEGORY GOT BACK : ',myCategory);
 
    const podManager = new PodcastsManager();
  
    const newPodcast = {
      name: body.name,
      description: body.description ?? "",
      url: body.url ?? "",
      date: body.date,
      duration: body.duration ? "" : 0,
      tags: body.tags,//TODO:: CHECK WHY TAGS AREN'T SAVED
      categoryId: myCategory.id ?? myCategory.insertedId.toHexString(),
      image: body.image ? "" : "https://source.unsplash.com/random/200x100?sig=1",
    };
  
    try {
      const result = await podManager.addPodcast(newPodcast);
      if (result.insertedId) {
        // Found the name.
        // Sends a HTTP success code
       return res
          .status(200)
          .json({ data: `New Podcast Added with id ; ${result.insertedId} ` });
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
