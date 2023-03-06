import nextConnect from 'next-connect';
import middleware from '../Database/database';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('podcasts').find({}).toArray()
    console.log(doc);
    res.json(doc);
});

export default handler;
