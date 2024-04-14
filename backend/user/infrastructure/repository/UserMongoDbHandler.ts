import { getDb } from "../../../database/mongoConnections"
import { User } from "../../domain/entities/IUser"
import { IUserRepository } from "../../domain/repository/IUserRepository"

export class UserMongoDbHandler implements IUserRepository {

    async findUser(user: User): Promise<User | null> {
        const db = await getDb()
        const userExists = await db.collection<User>('users').findOne({ name: user.name })
        return userExists
    }

    async getUsers(): Promise<User[]> {
        let result: User[] = []
        const db = await getDb()
        const users = await db.collection<User>('users').find()
        if (users) {
            await users.forEach(user => {
                result.push(user)
            })
        } else {
            result = users
        }
        return result
    }

    async getUser(socketId: string): Promise<User | null> {
        const db = await getDb()
        let userName = await db.collection<User>('users').findOne({ socketId: socketId })
        return userName
    }

    async createUser(newUser: User) {
        const db = await getDb()
        await db.collection<User>('users').insertOne({ name: newUser.name, pass: newUser.pass, socketId: "" })
    }

    async updateUser(user: User, socketId: string) {
        const db = await getDb()
        await db.collection<User>('users').updateOne({ name: user.name }, { $set: { socketId: socketId } })
    }

}