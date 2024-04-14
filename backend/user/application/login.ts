import { User } from "../domain/entities/IUser";
import { IUserRepository } from "../domain/repository/IUserRepository";

export const logIn = async (
  user: User,
  userRepository: IUserRepository
): Promise<User | null> => {
  const isSigned = await userRepository.findUser(user);
  return isSigned;
};
