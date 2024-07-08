import { Request, Response } from "express";
import { RoomServiceImpl } from '../../application/roomServiceImpl';
import { RoomRepositoryImpl } from '../../infraestructure/database/roomRepositoryImpl';

const roomRepository = new RoomRepositoryImpl();
const roomService = new RoomServiceImpl(roomRepository);

export default class RoomController {
  static async createRoom(req: Request, res: Response) {
    const { roomName } = req.body;
    console.log('create room:[roomController createRoom1]', { roomName });
    try {
      const room = await roomService.createRoom(roomName);
      console.log("Room created:[roomController createRoom2]", room);
      res.status(201).json({ success: true, room });
    } catch (error) {
      console.error("Error creating room[roomController createRoom error1]:", error);
      res.status(500).json({ error: 'Failed to create room[roomController createRoom error2]' });
    }
  }
  

  static async getRoomByName(req: Request, res: Response) {
    try {
      const { roomName } = req.params
      const room = await roomService.getRoomByName(roomName);
      if (!room) {
        console.log("Room not found:[roomController getRoomByName error1]", roomName);
        res.status(404).json({ error: 'Room not found[roomController getRoomByName error2]' });
      } else {
        console.log("Room found:[roomController] getRoomByName1", room);
        res.status(200).json(room);
      }
    } catch (error) {
      console.error("Error getting room by name:[roomController getRoomByName error 3]", error);
      res.status(500).json({ error: 'Failed to get room[roomController getRoomByName error4]' });
    }
  }

  static async getAllRooms(req: Request, res: Response) {
    console.log("getAllRooms1 called[roomController]");
    try {
      const rooms = await roomService.getAllRooms();
      res.status(200).json(rooms);
      console.log("Rooms fetched:[roomController getAllRooms2]", rooms);
    } catch (error) {
      console.error("Error getting all rooms:[roomController getAllRooms error1]", error);
      res.status(500).json({ error: "Error getting all rooms[roomController getAllRooms error2]" });
    }
  }

  static async getRoomIdByRoomName(req: Request, res: Response) {
    const { roomName } = req.params;
    console.log("getRoomIdByRoomName called with[roomController getRoomIdByRoomName]", { roomName });
    try {
      const roomId = await roomService.getRoomIdByRoomName(roomName);
      if (roomId) {
        console.log("Room ID found:[roomController getRoomIdByRoomName2]", roomId);
        res.status(200).json({  roomId });
      } else {
        console.log("Room not found:[roomController getRoomIdByRoomName error1]", roomName);
        res.status(404).json({ error: "[roomController getRoomIdByRoomName error2]Room not found" });
      }
    } catch (error) {
      console.error("[roomController getRoomIdByRoomName error3]Error getting room ID by roomname:", error);
      res.status(500).json({ error: "Error getting room ID by roomname[roomController getRoomIdByRoomName error4]" });
    }
  }
}