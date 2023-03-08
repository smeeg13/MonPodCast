const { connectToDb } = require("../../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
import { CATEGORY_COLL } from "../../../utils/constants";

export default class Categories {
  client;

  constructor() {
    this.client = connectToDb();
  }

  #getCollection = async () => {
    try {
      await this.client.connect();
      const db = this.client.db(process.env.MONGODB_DB);
      const Categories = db.collection(CATEGORY_COLL);
      return Categories;
    } catch (err) {
      console.error("MongoDb Connection error", err);
      await client.close();
      return null;
    }
  };

  getAllCategories = async () => {
    console.log(`Categories.js > getCategories`);

    const Categories = await this.#getCollection();
    let res = await Categories.find({}).toArray();

    res = res.map((category) => {
      console.log(category);
      return {
        id: category._id.toHexString(),
        name: category.name,
      };
    });

    if (res.length > 0) {
      console.log(res);
      return res;
    } else {
      console.log(`No Categories found`);
      return null;
    }
  };

  getUserByName = async (namecategory) => {
    console.log(`Categories.js > getCategories`);

    const Categories = await this.#getCollection();
    let res = await Categories.findOne({ name: namecategory });

    res = res.map((category) => {
        return {
            id: category._id.toHexString(),
            name: category.name,
          };
    });

    if (res.length > 0) {
      console.log(res);
      return res;
    } else {
      console.log(`No category found`);
      return null;
    }
  };

  addUser = async (category) => {
    console.log(`category.js > addcategory: ${category}`);

    const Categories = await this.#getCollection();
    return await Categories.insertOne(category);
  };

  addMultipleCategories = async (newCategories) => {
    console.log(`category.js > addMultiplecategory: ${newCategories}`);

    const Categories = await this.#getCollection();
    return await Categories.insertMany(newCategories);
  };

  updateUser = async (id, category) => {
    console.log(`category.js > updatecategory: ${category}`);

    const Categories = await this.#getCollection();
    return await Categories.updateOne(
      { _id: new ObjectId(id) },
      { $set: category }
    );
  };

  /*  Possible to update many doc to ensure they all have a certain field
    those which already have the fields stays same 
    and other get updated with the field putted as unknown
    
     => by using [...].updateMany({client: {$exist: false}}, {$set: {client: "Unknown"}});
*/

  deleteUserById = async (id) => {
    console.log(`category.js > deletecategory: ${id}`);

    const Categories = await this.#getCollection();
    const res = await Categories.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };

  deleteUserByName = async (namecategory) => {
    console.log(`category.js > deletecategory: ${namecategory}`);

    const Categories = await this.#getCollection();
    const res = await Categories.deleteOne({ name: namecategory });
    return res.deletedCount > 0;
  };

}

