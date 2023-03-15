const { connectToDb } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
import { USER_COLL } from "../../utils/constants";

export default class UsersManager {
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
      const Users = db.collection(USER_COLL);
      return Users;
    } catch (err) {
      console.error("MongoDb Connection error", err);
      await this.client.close();
      return null;
    }
  };

  getAllUsers = async () => {
    console.log(`Users.js > getUsers`);

    const Users = await this.#getCollection();
    let res = await Users.find({}).toArray();

    res = res.map((user) => {
      console.log(user);
      return {
        id: user._id.toHexString(),
        email: user.email,
        password: user.password,
        name: user.name,
      };
    });

    if (res.length > 0) {
      console.log(res);
      return res;
    } else {
      console.log(`No Users found`);
      return null;
    }
  };

  getUserByName = async (nameuser) => {
    console.log(`Users.js > getUsers`);

    const Users = await this.#getCollection();
    let res = await Users.findOne({ name: nameuser });

    res = res.map((user) => {
      return {
        id: user._id.toHexString(),
        email: user.email,
        password: user.password,
        name: user.name,
      };
    });

    if (res.length > 0) {
      console.log(res);
      return res;
    } else {
      console.log(`No user found`);
      return null;
    }
  };

  verifyUser = async (email,password) => {
    // add the HASH function for the password 
    const Uses = await this.#getCollection(); 
    let res = await Users.findOne({email: email},{password: password})

    res = res.map((user) => {
      return{
        id: user._id.toHexString(), 
        email: user.email,
        password: user.password,
        name: user.name
      }
      });
      if (res.length > 0){
        return res; 
      }else{
        return null
      }
    
  }

  addUser = async (user) => {
    console.log(`user.js > adduser: ${user}`);

    const Users = await this.#getCollection();
    return await Users.insertOne(user);
  };

  addMultipleUsers = async (newUsers) => {
    console.log(`user.js > addMultipleuser: ${newUsers}`);

    const Users = await this.#getCollection();
    return await Users.insertMany(newUsers);
  };

  updateUser = async (id, user) => {
    console.log(`user.js > updateuser: ${user}`);

    const Users = await this.#getCollection();
    return await Users.updateOne({ _id: new ObjectId(id) }, { $set: user });
  };

  /*  Possible to update many doc to ensure they all have a certain field
    those which already have the fields stays same 
    and other get updated with the field putted as unknown
    
     => by using [...].updateMany({client: {$exist: false}}, {$set: {client: "Unknown"}});
*/

  deleteUserById = async (id) => {
    console.log(`user.js > deleteuser: ${id}`);

    const Users = await this.#getCollection();
    const res = await Users.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };

  deleteUserByName = async (nameuser) => {
    console.log(`user.js > deleteuser: ${nameuser}`);

    const Users = await this.#getCollection();
    const res = await Users.deleteOne({ name: nameuser });
    return res.deletedCount > 0;
  };
}
