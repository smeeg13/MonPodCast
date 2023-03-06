import { MongoClient } from 'mongodb';
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res){
    
    const client =  await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const data = await db.collection("podcasts").aggregate([
        {
            $search: {
                search: {
                    query: req.query.term,
                    path: ["description", "name"]
                }
            }
        },
        {
            $project: {
                description: 1,
                name: 1
            }
        },
        {
            $limit: 15
        }
    ]).toArray()

    res.json(data);
}