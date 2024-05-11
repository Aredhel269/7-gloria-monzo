import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { PrismaClient } from '@prisma/client';
import {User} from '../../domain/entities/user'


const prisma = new PrismaClient();

export class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        userName: user.userName,
        password: user.password
      }
    })

    return newUser
  }


async getUserByUserName(userName: string): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({
      where: {
        userName
      },
      include: {
        rooms: {
          include: {
            room: true
          }
        }
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await prisma.user.findMany({
      include: {
        rooms: {
          include: {
            room: true
          }
        }
      }
    })

    return users
  }
}
