import { User } from '../entities/user';


export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserByUserName(userName: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}
  // Altres mètodes necessaris per gestionar usuaris

