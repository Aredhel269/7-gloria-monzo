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
      res.status(201).json(user);
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
        console.log("Login successful:", { user });
        res.status(200).json({ user });
      
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
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json({ error: "Error getting all users" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    console.log("deleteUser called with", { userId });
    try {
      await userService.deleteUser(userId);
      console.log("User deleted:", userId);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { userName, password } = req.body;
    console.log("updateUser called with", { userId, userName, password });
    try {
      const user = await userService.updateUser(userId, userName, password);
      console.log("User updated:", user);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }
}

export default new UserController();
