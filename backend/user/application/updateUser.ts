import { User } from "../domain/entities/IUser"
import { IUserRepository } from "../domain/repository/IUserRepository"

export const updateUser = async (user: User, socketId: string, userRepository: IUserRepository) => {
    await userRepository.updateUser(user, socketId)
}