import { UserRepository } from '../../domain/repositories/userRepository';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';

const prisma = new PrismaClient();

export class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<User> {
    console.log("Creating user in database:", user);
    const newUser = await prisma.user.create({
      data: {
        userName: user.userName,
        password: user.password
      }
    })
    console.log("User created in database:", newUser);
    return new User(newUser.userName, newUser.password)
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    console.log("Getting user by username from database:", userName);
    const user = await prisma.user.findFirst({
      where: { userName }
    });
    console.log("User fetched from database:", user);
    return user ? new User(user.userName, user.password || '') : null;
  }

  async getAllUsers(): Promise<User[]> {
    console.log("Getting all users from database");
    const users = await prisma.user.findMany();
    console.log("Users fetched from database:", users);
    return users.map((u: {
      userId: string;
      userName: string;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
    }) => new User(u.userName || '', u.password || ''));
  }
}
