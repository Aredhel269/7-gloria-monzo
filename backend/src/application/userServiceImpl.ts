import { User } from '../domain/entities/user';
import { UserService } from '../domain/services/userService';
import { UserRepository } from '../domain/repositories/userRepository';


export class UserServiceImpl implements UserService {
    private userRepository: UserRepository;
  
    constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
    }
  
    // Implementació dels mètodes de la interfície UserService
    async createUser(userName: string, password: string): Promise<User> {
      const newUser = new User(userName, password);
      return this.userRepository.createUser(newUser);
    }
  
    async getUserByUserName(userName: string): Promise<User | null> {
      return this.userRepository.getUserByUserName(userName);
    }
  
    async getAllUsers(): Promise<User[]> {
      return this.userRepository.getAllUsers();
    }
  }
  