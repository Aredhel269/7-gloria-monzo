import { Socket } from 'socket.io'
import { comparePassword, hashPassword } from '../../middelware/bcript'
import { User } from '../domain/entities/IUser'
import { signIn } from '../application/signin'
import { logIn } from '../application/login'
import { updateUser } from '../application/updateUser'
import { getUser } from '../application/getUser'
import { RoomSocket } from '../../room/infrastructure/roomSocket'
import { IUserRepository } from '../domain/repository/IUserRepository'

export class UserSocket {
    socket: Socket
    userRepository: IUserRepository
    constructor(socket: Socket, userRepository: IUserRepository) {
        this.socket = socket
        this.userRepository = userRepository
    }
    async connect(roomSocket: RoomSocket) {
        this.socket.on('login', async (user: User, socketId: string) => {
            const isSigned = await this.logIn(user, socketId)
            if (isSigned) {
                const roomToJoin = await roomSocket.getRoom('/')
                await roomSocket.joinRoom(roomToJoin, user.name)
            }
            roomSocket.loginAtempt(isSigned)
        })

        this.socket.on('user-joined-room-message', (location, name) => {
            const message = `${name} has joined the room`
            this.socket.broadcast.emit('user-joined-room-message', location, message)
        })

        this.socket.on('signin', async (newUser: User) => {
            await this.signIn(newUser)
        })

        this.socket.on('disconnect', async () => {
            const userName = await this.getUser(this.socket.id)
            if (userName) await roomSocket.deleteRoomsOnDisconnect(userName)
        })
    }

    async signIn(newUser: User): Promise<void> {
        newUser = {
            name: newUser.name,
            pass: await hashPassword(newUser.pass),
            socketId: ""
        }
        const exists: User | null = await signIn(newUser, this.userRepository)
        this.socket.emit('sign-atempt', exists)
    }

    async logIn(user: User, socketId: string): Promise<boolean | null> {
        const isSigned = await logIn(user, this.userRepository)
        if (isSigned) {
            const isMatch = await comparePassword(user.pass, isSigned.pass)
            if (isMatch) await updateUser(user, socketId, this.userRepository)
            return isMatch
        }
        this.socket.emit('login-atempt', isSigned)
        return isSigned
    }

    async getUser(socketId: string) {
        const userName = await getUser(socketId, this.userRepository)
        return userName
    }
}