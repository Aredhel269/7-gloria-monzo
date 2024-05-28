import { Request, Response } from "express";
import { UserServiceImpl } from "../../application/userServiceImpl";
import { UserRepositoryImpl } from "../../infraestructure/database/userRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);

class UserController {
  async registerUser(req: Request, res: Response) {
    const { userName, password } = req.body;
    console.log("registerUser called with", { userName, password });
    try {
      const user = await userService.createUser(userName, password);
      console.log("User created:", user);
      const userWithId = { ...user, id: user.userId };
      res.status(201).json(userWithId);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { userName, password } = req.body;
    console.log("loginUser called with", { userName, password });
    try {
      const user = await userService.login(userName, password);
      if (user) {
        console.log("Login successful:", { user });
        res.status(200).json({ user });
      } else {
        console.log("Login failed: incorrect credentials");
        res.status(401).json({ error: "Incorrect credentials" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Error logging in" });
    }
  }

  async getUserByUserName(req: Request, res: Response) {
    const { userName } = req.params;
    console.log("getUserByUserName called with", { userName });
    try {
      const user = await userService.getUserByUserName(userName);
      if (user) {
        console.log("User found:", user);
        res.status(200).json(user);
      } else {
        console.log("User not found:", userName);
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user by username:", error);
      res.status(500).json({ error: "Error getting user by username" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    console.log("getAllUsers called");
    try {
      const users = await userService.getAllUsers();
      console.log("Users fetched:", users);
      const usersWithIds = users.map(user => ({ ...user, id: user.userId }));
      res.status(200).json(usersWithIds);
    } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json({ error: "Error getting all users" });
    }
  }


}

export default new UserController();