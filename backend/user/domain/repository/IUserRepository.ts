import { User } from "../entities/IUser"

export interface IUserRepository {

    findUser(user: User): Promise<User | null>

    getUsers(): Promise<User[]>

    getUser(socketId: string): Promise<User | null>

    getUser(socketId: string): Promise<User | null>

    createUser(newUser: User): Promise<void>

    updateUser(user: User, socketId: string): Promise<void>
}