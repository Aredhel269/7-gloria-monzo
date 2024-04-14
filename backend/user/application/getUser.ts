import { IUserRepository } from "../domain/repository/IUserRepository"

export const getUser = async (socketId: string, userRepository: IUserRepository) => {
    let userName = await userRepository.getUser(socketId)
    return userName
}