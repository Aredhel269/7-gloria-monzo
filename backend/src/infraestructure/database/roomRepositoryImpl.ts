import { Room } from '../../domain/entities/room';
import { RoomRepository } from '../../domain/repositories/roomRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoomRepositoryImpl implements RoomRepository {
  async createRoom(room: Room): Promise<Room> {
    console.log("[roomRepoImpl][createRoom1] Creating new room:", room.roomName);

    try {
      const newRoom = await prisma.room.create({
        data: {
          roomName: room.roomName,
        },
      });

      console.log("[roomRepoImpl][createRoom2] New room created:", newRoom);

      if (typeof newRoom.roomName === 'string') {
        return new Room(newRoom.roomName);
      } else {
        console.error("[roomRepoImpl][createRoom error1] Room name must be a string");
        throw new Error('Room name must be a string');
      }
    } catch (error) {
      console.error("[roomRepoImpl][createRoom error2] Error creating room:", error);
      throw error;
    }
  }/*async createRoom(roomName: string): Promise<Room> {
  console.log("[roomRepoImpl][createRoom1] Creating new room:", roomName);
  const newRoom = await prisma.room.create({
    data: {
      roomName
    }
  });
  console.log("[roomRepoImpl][createRoom2] New room created:", newRoom);
  return newRoom;
}
*/

  async getRoomByName(roomName: string): Promise<Room | null> {
    console.log("[roomRepoImpl][getRoomByName1] Getting room by name:", roomName);

    try {
      const room = await prisma.room.findFirst({
        where: {
          roomName: roomName,
        },
      });

      console.log("[roomRepoImpl][getRoomByName2] Room found:", room);

      return room ? new Room(room.roomName ?? '') : null;
    } catch (error) {
      console.error("[roomRepoImpl][getRoomByName error] Error getting room by name:", error);
      throw error;
    }
  }
  async getRoomIdByRoomName(roomName: string): Promise<string|null>{
    console.log("Getting roomId by roomName from database:[roomRepoImpl getRoomIdByRoomName1]", roomName);
    const room = await prisma.room.findFirst({
      where: { roomName },
      select: { roomId: true } 
    });
    console.log("room fetched from database:[roomRepoImpl getRoomIdByRoomName2]", room);
    return room?.roomId || null;
  }
  async getAllRooms(): Promise<Room[]> {
    console.log("[roomRepoImpl][getAllRooms1] Getting all rooms");

    try {
      const rooms = await prisma.room.findMany();
      console.log("[roomRepoImpl][getAllRooms2] Rooms found:", rooms);

      return rooms.map((r) => new Room(r.roomName || ''));
    } catch (error) {
      console.error("[roomRepoImpl][getAllRooms error] Error getting all rooms:", error);
      throw error;
    }
  }
}
