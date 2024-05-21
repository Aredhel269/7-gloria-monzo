import { Request, Response } from 'express';
import { RoomServiceImpl } from '../../application/roomServiceImpl';
import { RoomRepositoryImpl } from '../../infraestructure/database/roomRepositoryImpl';

const roomRepository = new RoomRepositoryImpl();
const roomService = new RoomServiceImpl(roomRepository);

export default class RoomController {
    static async createRoom(req: Request, res: Response) {
        try {
            const { roomName } = req.body;
            const room = await roomService.createRoom(roomName);
            res.status(201).json(room);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create room' });
        }
    }

    static async getRoomByName(req: Request, res: Response) {
        try {
            const { roomName } = req.params;
            const room = await roomService.getRoomByName(roomName);
            if (!room) {
                res.status(404).json({ error: 'Room not found' });
            } else {
                res.status(200).json(room);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get room' });
        }
    }

    static async getAllRooms(req: Request, res: Response) {
        try {
            const rooms = await roomService.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get rooms' });
        }
    }
}