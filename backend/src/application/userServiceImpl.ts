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
        console.log("Creating user with[userServImpl createUser1]", { userName, password });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(userName, hashedPassword);
        console.log("User created with hashed password:[userServImpl createUser2]", newUser);
        return this.userRepository.createUser(newUser);
    }

    async getUserByUserName(userName: string): Promise<User | null> {
        console.log("Getting user by username:[userServImpl getUserByUserName]", userName);
        return this.userRepository.getUserByUserName(userName);
    }

    async getAllUsers(): Promise<User[]> {
        console.log("Getting all users[userServImpl getAllUsers]");
        return this.userRepository.getAllUsers();
    }

    async login(userName: string, password: string): Promise<User | null> {
        console.log("Logging in 'user' with[userServImpl login1]", { userName, password });
        const user = await this.userRepository.getUserByUserName(userName);
        if (user && await bcrypt.compare(password, user.password)) {
            console.log("Login successful for user:[userServImpl login2]", userName);
            return user;
        }
        console.log("Login failed for user:[userServImpl login error]", userName);
        return null;
    }
}

