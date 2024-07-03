import { UserRepository } from '../../domain/repositories/userRepository';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';

const prisma = new PrismaClient();

export class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<User> {
    console.log("Creating user in database:[userRepoImpl createUser1]", user);
    const newUser = await prisma.user.create({
      data: {
        userName: user.userName,
        password: user.password
      }
    });
    console.log("User created in database:[userRepoImpl createUser2]", newUser);
    return new User(newUser.userName, newUser.password);
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    console.log("Getting user by username from database:[userRepoImpl getUserByUserName1]", userName);
    const user = await prisma.user.findFirst({
      where: { userName }
    });
    console.log("User fetched from database:[userRepoImpl getUserByUserName2]", user);
    return user ? new User(user.userName, user.password || '') : null;
  }

  async getUserIdByUserName(userName: string): Promise<string|null>{
    console.log("Getting userId by username from database:[userRepoImpl getUserIdByUserName1]", userName);
    const user = await prisma.user.findFirst({
      where: { userName },
      select: { userId: true } 
    });
    console.log("User fetched from database:[userRepoImpl getUserIdByUserName2]", user);
    return user?.userId || null;
  }
  

  async getAllUsers(): Promise<User[]> {
    console.log("Getting all users from database[userRepoImpl getAllUsers1]");
    const users = await prisma.user.findMany();
    console.log("Users fetched from database:[userRepoImpl getAllUsers2]", users);
    return users.map((u: {
      userId: string;
      userName: string;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
    }) => new User(u.userName || '', u.password || ''));
  }

  async updateUser(userId: string, userName: string, password: string): Promise<User | null> {
    console.log("Updating user in database:[userRepoImpl updateUser]", { userId, userName, password });
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        userName,
        password
      }
    });
    console.log("User updated in database:[userRepoImpl updateUser]", updatedUser);
    return updatedUser ? new User(updatedUser.userName, updatedUser.password || '') : null;
  }

  async deleteUser(userId: string): Promise<void> {
    console.log("Deleting user from database:[userRepoImpl]", userId);
    await prisma.user.delete({
      where: { userId }
    });
    console.log("User deleted from database[userRepoImpl]");
  }
}


