import { User } from '../entities/user';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

//interficie del servei
export interface UserService {
    createUser(userName: string, password: string): Promise<User>;
    getUserByUserName(userName: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    login(userName: string, password: string): Promise<User | null>; // Afegim el mètode login
}

// Implementació del servei
export class UserServiceImpl implements UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userName: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(userName, hashedPassword);
        return this.userRepository.createUser(newUser);
    }

    async getUserByUserName(userName: string): Promise<User | null> {
        return this.userRepository.getUserByUserName(userName);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    async login(userName: string, password: string): Promise<User | null> {
        const user = await this.userRepository.getUserByUserName(userName);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}
