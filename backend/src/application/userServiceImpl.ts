import { User } from '../domain/entities/user';
import { UserService } from '../domain/services/userService';
import { UserRepository } from '../domain/repositories/userRepository';
import bcrypt from 'bcryptjs';

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
