import { FastifyRequest, FastifyReply } from "fastify";
import { RoomServiceImpl } from '../../application/roomServiceImpl';
import { RoomRepositoryImpl } from '../../infraestructure/database/roomRepositoryImpl';

const roomRepository = new RoomRepositoryImpl();
const roomService = new RoomServiceImpl(roomRepository);

class RoomController {
  async createRoom(request: FastifyRequest, reply: FastifyReply) {
    const { roomName } = request.body as { roomName: string };
    console.log("createRoom called with", { roomName });
    try {
      const room = await roomService.createRoom(roomName);
      console.log("Room created:", room);
      const roomWithId = { ...room, id: room.roomId };
      reply.status(201).send(roomWithId);
    } catch (error) {
      console.error("Error creating room:", error);
      reply.status(500).send({ error: 'Failed to create room' });
    }
  }

  async getRoomByName(request: FastifyRequest, reply: FastifyReply) {
    const { roomName } = request.params as { roomName: string };
    console.log("getRoomByName called with", { roomName });
    try {
      const room = await roomService.getRoomByName(roomName);
      if (!room) {
        console.log("Room not found:", roomName);
        reply.status(404).send({ error: 'Room not found' });
      } else {
        console.log("Room found:", room);
        reply.status(200).send(room);
      }
    } catch (error) {
      console.error("Error getting room by name:", error);
      reply.status(500).send({ error: 'Failed to get room' });
    }
  }

  async getAllRooms(request: FastifyRequest, reply: FastifyReply) {
    console.log("getAllRooms called");
    try {
      const rooms = await roomService.getAllRooms();
      console.log("Rooms fetched:", rooms);
      const roomsWithIds = rooms.map(room => ({ ...room, id: room.roomId }));
      reply.status(200).send(roomsWithIds);
    } catch (error) {
      console.error("Error getting all rooms:", error);
      reply.status(500).send({ error: "Error getting all rooms" });
    }
  }
}

export default new RoomController();
