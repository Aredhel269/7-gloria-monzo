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
    })
    return new User(newUser.userName, newUser.password)
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { userName }
    });
    return user ? new User(user.userName, user.password || '') : null;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((u: {
      userId: string;
      userName: string;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
    }) => new User(u.userName || '', u.password || ''));
  }
}
