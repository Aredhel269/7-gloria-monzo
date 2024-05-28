import { User } from '../entities/user';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserByUserName(userName: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(userId: string, userName: string, password: string): Promise<User | null>;
  deleteUser(userId: string): Promise<void>; 
  
}