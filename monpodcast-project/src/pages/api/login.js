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
      const token = await usersManager.login(loginUser.email,loginUser.password)
      

      if (token) {
        // Sends a HTTP success code
        return res
          .status(200)
          .json({ data: `You're logged in` });
      } else {
        return res
          .status(400)
          .json({ data: 'Wrong creds'});
      }
    } catch (error) {
      // Sends a HTTP bad request error code
      return res
        .status(400)
        .json({ data: `Error while loggin ${error} ` });
    }
}