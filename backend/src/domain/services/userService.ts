import { User } from '../entities/user';

export interface UserService {
    createUser(userName: string, password: string): Promise<User>;
    getUserByUserName(userName: string): Promise<User | null>;
    getUserIdByUserName(userName: string): Promise<string | null>;
    getAllUsers(): Promise<User[]>;
    login(userName: string, password: string): Promise<User | null>; 
}