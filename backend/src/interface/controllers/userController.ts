import { Request, Response } from "express";
import { UserServiceImpl } from "../../application/userServiceImpl";
import { UserRepositoryImpl } from "../../infraestructure/database/userRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);

export default class UserController {
  static async registerUser(req: Request, res: Response) {
    const { userName, password } = req.body;
    console.log('registerUser called with:[userController registerUser1]', { userName, password });
    try {
      const user = await userService.createUser(userName, password);
      console.log("User created:[userController registerUser2]", user);
      res.status(201).json({ success: true, user: { userName: user.userName, userId: user.userId } });
    } catch (error) {
      console.error("Error registering user:[userController registerUser error1]", error);
      res.status(500).json({ error: "Error registering user[userController registerUser error2]" });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { userName, password } = req.body
    console.log("loginUser called with[userController login1]", { userName, password });
    try {
      const user = await userService.login(userName, password);
      if (user) {
        console.log("Login successful:[userController login2]", { user });
        res.status(200).json({ user: { userName: user.userName, userId: user.userId } });
      } else {
        console.log("Login failed: incorrect credentials[userController loginUser error1]");
        res.status(401).json({ error: "Incorrect credentials[userController  loginUser error2]" });
      }
    } catch (error) {
      console.error("Error logging in:[userController loginUser error3]", error);
      res.status(500).json({ error: "Error logging in[userController loginUser error4]" });
    }
  }
  static async getUserByUserName(req: Request, res: Response) {
    const { userName } = req.params
    console.log("getUserByUserName called with[userController getUserByUserName1]", { userName });
    try {
      const user = await userService.getUserByUserName(userName);
      if (user) {
        console.log("User found:[userController getUserByUserName2]", user);
        res.status(200).json(user);
      } else {
        console.log("User not not found:[userController getUserByUserName error1]", userName);
        res.status(404).json({ error: "[userController getUserByUserName error2]User not found" });
      }
    } catch (error) {
      console.error("[userController getUserByUserName error3]Error getting user by username:", error);
      res.status(500).json({ error: "Error getting user by username[userController getUserByUserName error4]" });
    }
  }

    static async getUserIdByUserName(req: Request, res: Response) {
    const { userName } = req.params;
    console.log("getUserIdByUserName called with[userController getUserIdByUserName1]", { userName });
    try {
      const userId = await userService.getUserIdByUserName(userName);
      if (userId) {
        console.log("User ID found:[userController getUserIdByUserName2]", userId);
        res.status(200).json({ userId });
      } else {
        console.log("User not found:[userController getUserIdByUserName error1]", userName);
        res.status(404).json({ error: "[userController getUserIdByUserName error2]User not found" });
      }
    } catch (error) {
      console.error("[userController getUserIdByUserName error3]Error getting user ID by username:", error);
      res.status(500).json({ error: "Error getting user ID by username[userController getUserIdByUserName error4]" });
    }
  }



  static async getAllUsers(req: Request, res: Response) {
    console.log("getAllUsers1 called[userController]");
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
      console.log("Users fetched:[userController getAllUsers2]", users);
    } catch (error) {
      console.error("Error getting all users:[userController getAllUsers error 1]", error);
      res.status(500).json({ error: "Error getting all [userController getAllUsers error2]" });
    }
  }
}