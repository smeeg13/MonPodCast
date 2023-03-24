import '../../lib/mongodb'
import PodcastsManager from '../../models/podcastsManager'
export default async function handler(req, res){
    
   try {
    console.log('API SEARCH HANDLER START')
     const podcastsManager =  new PodcastsManager();
     console.log('Request : ', req);
     console.log('Body : ', req.query);

     const data = await podcastsManager.searchPodcast(req.query.term);
 
     return res.status(200).json(data);
   } catch (error) {
    // Sends a HTTP bad request error code
    return res
    .status(400)
    .json({ data: `Couldn't get any podcast ` });

   }
}