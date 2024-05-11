import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { PrismaClient } from '@prisma/client';
import {PrismaUser} from '../../domain/entities/user'


const prisma = new PrismaClient();

export class UserRepositoryImpl implements UserRepository {
  async createUser(user: PrismaUser): Promise<PrismaUser> {
    const newUser = await prisma.user.create({
      data: {
        userName: user.userName,
        displayName: user.displayName,
        password: user.password
      }
    })

    return newUser
  }


async getUserByUsername(userName: string): Promise<PrismaUser | null> {
    const user: PrismaUser | null = await prisma.user.findUnique({
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

  async getAllUsers(): Promise<PrismaUser[]> {
    const users: PrismaUser[] = await prisma.user.findMany({
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
