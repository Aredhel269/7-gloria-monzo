import { User } from '../entities/user';

//interficie del servei
export interface UserService {
    createUser(userName: string, password: string): Promise<User>;
    getUserByUserName(userName: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    login(userName: string, password: string): Promise<User | null>; 
}