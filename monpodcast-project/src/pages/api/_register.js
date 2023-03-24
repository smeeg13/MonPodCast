import UsersManager from "../../models/usersManager";

export default async function handler(req, res) {


    const body = req.body;

    // Logging to see the request

    console.log(req.body)
    const usersManager = new UsersManager();
  
    const newUser = {
      email: body.email,
      password: body.password,
      username: body.username,
      is_admin: false
  };
  
    try {

      const result = await usersManager.addUser(newUser); 
      
      
      if (result.insertedId) {
        // Found the name.
        // Sends a HTTP success code
        return res
          .status(200)
          .json({ data: `User created` });
      } else {
        return res
          .status(400)
          .json({ data: 'Unable to create the user'});
      }
    } catch (error) {
      // Sends a HTTP bad request error code
      return res
        .status(400)
        .json({ data: `Error while adding a user ${error} ` });
    }
}