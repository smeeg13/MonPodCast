
export default async function handler(req, res){
    
    const client = connectToDb();
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