
export default async function handler(req, res){
    
  const client = connectToDb();
  const db = client.db(process.env.MONGODB_DB);

    const data = req.query;

   const response = await db.collection('application_users').insertOne(data);

    res.json(response);
}
