//import { User } from '../entities/user';
import { PrismaUser } from '../../domain/entities/user';


export interface UserRepository {
  createUser(user: PrismaUser): Promise<PrismaUser>;
  getUserByUsername(userName: string): Promise<PrismaUser | null>;
  getAllUsers(): Promise<PrismaUser[]>;
}
  // Altres mètodes necessaris per gestionar usuaris

