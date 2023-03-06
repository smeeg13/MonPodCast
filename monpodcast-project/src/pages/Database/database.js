import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://admin:Password123!@cluster0.lv3r9cs.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db('MonPodcast');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;