import { UserServiceImpl } from '../../application/userServiceImpl';
import { UserRepositoryImpl } from '../../infraestructure/database/userRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);

export const registerUser = async (req: { body: { userName: string; password: string; }; }) => {
  const { userName, password } = req.body;
  const user = await userService.createUser(userName, password);
  return user
};
