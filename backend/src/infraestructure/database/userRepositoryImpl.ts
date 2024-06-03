import { UserRepository } from '../../domain/repositories/userRepository';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';

const prisma = new PrismaClient();

export class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        userName: user.userName,
        password: user.password
      }
    });
    return new User(newUser.userName, newUser.password, newUser.userId);
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { userName }
    });
    return user ? new User(user.userName, user.password, user.userId) : null;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => new User(user.userName, user.password, user.userId));
  }

  async updateUser(userId: string, userName: string, password: string): Promise<User | null> {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        userName,
        password
      }
    });
    return updatedUser ? new User(updatedUser.userName, updatedUser.password, updatedUser.userId) : null;
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { userId }
    });
  }
}
