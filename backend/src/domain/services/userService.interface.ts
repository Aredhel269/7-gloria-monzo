import { User } from '../entities/user';

export interface UserService {
  createUser(username: string, password: string, displayName?: string): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  // Altres mètodes necessaris per gestionar usuaris
}
