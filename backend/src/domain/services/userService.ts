import { User } from '../entities/user';
import { UserRepository } from '../repositories/userRepository';

//interficie del servei
export interface UserService {
    createUser(userName: string, password: string): Promise<User>;
    getUserByUserName(userName: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
}
// Implementació del servei
export class UserServiceImpl implements UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // Implementació del mètode createUser
    async createUser(
        userName: string,
        password: string,
    ): Promise<User> {
        const newUser = new User(userName, password); 
        return this.userRepository.createUser(newUser);
    }
    
    // Implementació del mètode getUserByUsername
    async getUserByUserName(userName: string): Promise<User | null> {
        return this.userRepository.getUserByUserName(userName) 
    }

    // Implementació del mètode getAllUsers
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers()
    }

    // Implementacions d'altres mètodes del servei d'usuaris
}