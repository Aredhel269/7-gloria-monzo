import { User } from '../entities/user';

export interface UserService {
  createUser(userName: string, password: string): Promise<User>;
  getUserByUserName(userName: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  // Altres mètodes necessaris per gestionar usuaris
}
