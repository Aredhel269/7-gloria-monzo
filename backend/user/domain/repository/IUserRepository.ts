import { User } from "../entities/IUser";

export interface IUserRepository {
  createUser(newUser: User): Promise<void>;
  updateUser(user: User, socketId: string): Promise<void>;
  findUser(user: User): Promise<User | null>;
  getUser(socketId: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
}
