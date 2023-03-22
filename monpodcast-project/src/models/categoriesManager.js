const { connectToDb } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
import { CATEGORY_COLL } from "../../utils/constants";

export default class CategoriesManager {
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
      const Categories = db.collection(CATEGORY_COLL);
      return Categories;
    } catch (err) {
      console.error("MongoDb Connection error", err);
      await this.client.close();
      return null;
    }
  };

  getAllCategories = async () => {
    console.log(`Categories.js > getCategories`);

    const Categories = await this.#getCollection();
    let res = await Categories.find({}).toArray();

    res = res.map((category, index) => {
      console.log(category);
      return {
        id: category._id.toHexString(),
        name: category.name,
      };
    });

    if (res.length > 0) {
      return res;
    } else {
      console.log(`No Categories found`);
      return null;
    }
  };

  getCategoryByName = async (namecategory) => {
    console.log(`Categories.js > getCategories`);

    const Categories = await this.#getCollection();
    let res = await Categories.find({ name: namecategory }).toArray();

    res = res.map((category) => {
      return {
        id: category._id.toHexString(),
        name: category.name,
      };
    });

    if (res.length > 0) {
      console.log(res);
      return res[0];
    } else {
      console.log(`No category found`);
      return null;
    }
  };

  addCategory = async (category) => {
    console.log(`category.js > addcategory: ${category}`);

    const Category = await this.#getCollection();
    return await Category.insertOne(category);
  };

  upsertCategory = async (category) => {
    console.log(`category.js > updatecategory: ${category}`);

    const categoryCollection = await this.#getCollection();
    return await categoryCollection.findAndModify({
      query: { name: category.name},
      update: {
        $setOnInsert: category
      },
      new: true,   // return new doc if one is upserted
      upsert: true // insert the document if it does not exist
    })
    // .updateOne(
    //   { name: category.name },
    //   { $set: category }, { upsert: true });
  };

  addMultipleCategories = async (newCategories) => {
    console.log(`category.js > addMultiplecategory: ${newCategories}`);

    const Categories = await this.#getCollection();
    return await Categories.insertMany(newCategories);
  };

  /*  Possible to update many doc to ensure they all have a certain field
    those which already have the fields stays same 
    and other get updated with the field putted as unknown
    
     => by using [...].updateMany({client: {$exist: false}}, {$set: {client: "Unknown"}});
*/

  deleteCategoryById = async (id) => {
    console.log(`category.js > deletecategory: ${id}`);

    const Categories = await this.#getCollection();
    const res = await Categories.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };

  deleteCategoryByName = async (namecategory) => {
    console.log(`category.js > deletecategory: ${namecategory}`);

    const Categories = await this.#getCollection();
    const res = await Categories.deleteOne({ name: namecategory });
    return res.deletedCount > 0;
  };
}
