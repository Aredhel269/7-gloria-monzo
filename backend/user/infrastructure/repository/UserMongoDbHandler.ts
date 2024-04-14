import { getDb } from "../../../database/mongoConnections";
import { User } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repository/IUserRepository";

export class UserMongoDbHandler implements IUserRepository {
  async findUser(user: User): Promise<User | null> {
    const db = await getDb();
    const userExists = await db
      .collection<User>("users")
      .findOne({ name: user.name });
    return userExists;
  }

  async getUsers(): Promise<User[]> {
    const db = await getDb();
    const usersCursor = db.collection<User>("users").find();
    const users: User[] = [];

    await usersCursor.forEach((user) => {
      users.push(user);
    });

    return users;
  }

  async getUser(socketId: string): Promise<User | null> {
    const db = await getDb();
    let userName = await db
      .collection<User>("users")
      .findOne({ socketId: socketId });
    return userName;
  }

  async createUser(newUser: User) {
    const db = await getDb();
    await db
      .collection<User>("users")
      .insertOne({ name: newUser.name, pass: newUser.pass, socketId: "" });
  }

  async updateUser(user: User, socketId: string) {
    const db = await getDb();
    await db
      .collection<User>("users")
      .updateOne({ name: user.name }, { $set: { socketId: socketId } });
  }
}
