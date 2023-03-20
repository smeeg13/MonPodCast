import UsersManager from "../../models/usersManager";

export default async function handler(req, res) {


    const body = req.body;

    // Logging to see the request

    const usersManager = new UsersManager();
  
    const loginUser = {
      email: body.email,
      password: body.password
  };
  
    try {
      const result = await usersManager.verify(loginUser.email,loginUser.password)
      if (True) {
        // Found the name.
        // Sends a HTTP success code
        res
          .status(200)
          .json({ data: `New Podcaste Added with id ; ${result.insertedId} ` });
      } else {
        return res
          .status(400)
          .json({ data: `Couldn't add the podcast ; ${body.name} ` });
      }
    } catch (error) {
      // Sends a HTTP bad request error code
      return res
        .status(400)
        .json({ data: `Couldn't add the podcast ; ${body.name} ` });
    }
}