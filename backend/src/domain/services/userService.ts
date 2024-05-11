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
    displayName?: string
  ): Promise<User> {
    const newUser = new User(userName, password, displayName)
    const userDTO = {
      userName: newUser.userName,
      password: newUser.password,
      displayName: newUser.displayName || '', // Use empty string if displayName is undefined
      rooms: [] // Add an empty rooms array
    }
    const prismaUser = await this.userRepository.createUser(userDTO)
    return new User(
      prismaUser.userName,
      prismaUser.password,
      prismaUser.displayName
    )
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    const prismaUser = await this.userRepository.getUserByUsername(userName)
    if (!prismaUser) return null
    return {
      _userId: prismaUser.id,
      _userName: prismaUser.userName,
      _displayName: prismaUser.displayName,
      _password: prismaUser.password
    }
  }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers()
    }

    // Implementacions d'altres mètodes del servei d'usuaris
}