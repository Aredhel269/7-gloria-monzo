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
        console.log("Creating user with", { userName, password });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(userName, hashedPassword);
        console.log("User created with hashed password:", newUser);
        return this.userRepository.createUser(newUser);
    }

    async getUserByUserName(userName: string): Promise<User | null> {
        console.log("Getting user by username:", userName);
        return this.userRepository.getUserByUserName(userName);
    }

    async getAllUsers(): Promise<User[]> {
        console.log("Getting all users");
        return this.userRepository.getAllUsers();
    }

    async login(userName: string, password: string): Promise<User | null> {
        console.log("Logging in user with", { userName, password });
        const user = await this.userRepository.getUserByUserName(userName);
        if (user && await bcrypt.compare(password, user.password)) {
            console.log("Login successful for user:", userName);
            return user;
        }
        console.log("Login failed for user:", userName);
        return null;
    }
    async deleteUser(userId: string): Promise<void> {
        console.log("Deleting user with userId:", userId);
        return this.userRepository.deleteUser(userId);
    }

    async updateUser(
        userId: string,
        userName: string,
        password: string
    ): Promise<User | null> {
        console.log('Updating user with', { userId, userName, password })
        const hashedPassword = await bcrypt.hash(password, 10)
        return (
            this.userRepository.updateUser(userId, userName, hashedPassword)
        )
    }
}
/* async updateUser(userId: string, userName: string, password: string): Promise<User> {
        console.log("Updating user with", { userId, userName, password });
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.updateUser(userId, userName, hashedPassword) || {
            user: null,
            error: null
        };*/ 

