import { User } from '../entities/user';
import { UserRepository } from '../repositories/userRepository.interface';
import { UserService } from './userService.interface';

export class UserServiceImpl implements UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(
        userName: string,
        password: string,
    ): Promise<User> {
        const newUser = new User(userName, password); 
      return this.userRepository.createUser(newUser);
    }

    async getUserByUserName(userName: string): Promise<User | null> {
      return this.userRepository.getUserByUserName(userName) 
    }

    async getAllUsers(): Promise<User[]> {
        
        return this.userRepository.getAllUsers()
    }

    // Implementacions d'altres mètodes del servei d'usuaris
}
