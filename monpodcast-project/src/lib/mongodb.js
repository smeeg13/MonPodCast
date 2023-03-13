import { MongoClient } from "mongodb";



const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
export const connectToDb = () => {
  let client;

  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri, options);

    }
   client = global._mongoClient;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options );
  }
  return client;
};