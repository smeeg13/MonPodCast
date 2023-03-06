import { MongoClient } from 'mongodb';
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res){
    
    const client =  await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const data = req.query;

   const response = await db.collection('application_users').insertOne(data);

    res.json(response);
}

// To write into the DB copy & paste this function bellow befor the return of the component

// const createUserAccount = async(property) =>{
//     const data= await fetch(`http://localhost:3000/api/new_user?username=${property.name}&email=${property.email}&password=${property.password}`)
//     const res = await data.json();
//      console.log(res);
//    }

//Then use it in a button for example :
{/* <button className='submit' onClick={()=> createUserAccount(property)}>
        Book this Now
      </button> */}