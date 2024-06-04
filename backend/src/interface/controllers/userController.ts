import { FastifyRequest, FastifyReply } from "fastify";
import { UserServiceImpl } from "../../application/userServiceImpl";
import { UserRepositoryImpl } from "../../infraestructure/database/userRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);

class UserController {
  async registerUser(request: FastifyRequest, reply: FastifyReply) {
    const { userName, password } = request.body as { userName: string, password: string };
    console.log("registerUser called with", { userName, password });
    try {
      const user = await userService.createUser(userName, password);
      console.log("User created:", user);
      const userWithId = { ...user, id: user.userId };
      reply.status(201).send(userWithId);
    } catch (error) {
      console.error("Error registering user:", error);
      reply.status(500).send({ error: "Error registering user" });
    }
  }

  async loginUser(request: FastifyRequest, reply: FastifyReply) {
    const { userName, password } = request.body as { userName: string, password: string };
    console.log("loginUser called with", { userName, password });
    try {
      const user = await userService.login(userName, password);
      if (user) {
        console.log("Login successful:", { user });
        reply.status(200).send({ user });
      } else {
        console.log("Login failed: incorrect credentials");
        reply.status(401).send({ error: "Incorrect credentials" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      reply.status(500).send({ error: "Error logging in" });
    }
  }

  async getUserByUserName(request: FastifyRequest, reply: FastifyReply) {
    const { userName } = request.params as { userName: string };
    console.log("getUserByUserName called with", { userName });
    try {
      const user = await userService.getUserByUserName(userName);
      if (user) {
        console.log("User found:", user);
        reply.status(200).send(user);
      } else {
        console.log("User not found:", userName);
        reply.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user by username:", error);
      reply.status(500).send({ error: "Error getting user by username" });
    }
  }

  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    console.log("getAllUsers called");
    try {
      const users = await userService.getAllUsers();
      console.log("Users fetched:", users);
      const usersWithIds = users.map(user => ({ ...user, id: user.userId }));
      reply.status(200).send(usersWithIds);
    } catch (error) {
      console.error("Error getting all users:", error);
      reply.status(500).send({ error: "Error getting all users" });
    }
  }
}

export default new UserController();






