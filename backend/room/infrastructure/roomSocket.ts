import { Socket } from "socket.io";
import { getRoom } from "../application/getRoom";
import { updateMessages } from "../application/updateMessages";
import { createRoom } from "../application/createRoom";
import { deleteRoom } from "../application/deleteRoom";
import { joinRoom } from "../application/joinRoom";
import { leaveRoom } from "../application/leaveRoom";
import { deleteRoomsOnDisconnect } from "../application/deleteRoomsOnDisconnect";
import { getRooms } from "../application/getRooms";
import { IRoomRepository } from "../domain/repositories/IRoomRepository";
import { Room, TMessage } from "../domain/entities/IRoom";
import { User } from "../../user/domain/entities/IUser";

export class RoomSocket {
  socket: Socket;
  roomRepository: IRoomRepository;
  constructor(socket: Socket, roomRepository: IRoomRepository) {
    this.socket = socket;
    this.roomRepository = roomRepository;
  }

  async connect() {
    this.socket.on("send-msg", async (msg: TMessage) => {
      await this.updateMessages(msg);
    });

    this.socket.on("create-room", async (newRoom: Room) => {
      await this.createRoom(newRoom);
    });

    this.socket.on("delete-room", async (room: Room) => {
      await this.deleteRoom(room);
    });

    this.socket.on(
      "join-room",
      async (roomToJoin: Room, roomToLeave: string | null, user: string) => {
        if (roomToLeave) await this.leaveRoom(roomToLeave, user);
        await this.joinRoom(roomToJoin, user);
      }
    );
  }

  async getRoom(room: string) {
    const roomToJoin = await getRoom(room, this.roomRepository);
    return roomToJoin;
  }

  async getRooms(userName: string) {
    const rooms = await getRooms(userName, this.roomRepository);
  }

  async joinRoom(room: Room | Room, user: string) {
    const roomToJoin = await getRoom(room.name, this.roomRepository);
    const rooms = await joinRoom(roomToJoin, user, this.roomRepository);
    this.socket.broadcast.emit("update-rooms", rooms);
    this.socket.emit("update-rooms", rooms);
  }

  async loginAtempt(isSigned: User | null | boolean) {
    this.socket.emit("login-atempt", isSigned);
    this.socket.broadcast.emit("login-atempt", isSigned);
  }

  async leaveRoom(roomToLeave: string, user: string) {
    await leaveRoom(roomToLeave, user, this.roomRepository);
  }

  async updateMessages(msg: TMessage) {
    const rooms = await updateMessages(msg, this.roomRepository);
    this.socket.broadcast.emit("update-rooms", rooms);
    this.socket.emit("update-rooms", rooms);
  }

  async createRoom(newRoom: Room) {
    const rooms = await createRoom(newRoom, this.roomRepository);
    if (rooms) {
      this.socket.broadcast.emit("update-rooms", rooms);
      this.socket.emit("update-rooms", rooms);
    } else {
      this.socket.emit(`${newRoom.name}-exists`, true);
    }
  }

  async deleteRoom(room: Room) {
    const rooms = await deleteRoom(room, this.roomRepository);
    this.socket.broadcast.emit("update-rooms", rooms);
    this.socket.emit("update-rooms", rooms);
  }

  async deleteRoomsOnDisconnect(userName: any) {
    const roomsAfterDelete = await deleteRoomsOnDisconnect(
      userName,
      this.roomRepository
    );
    this.socket.emit("update-rooms", roomsAfterDelete);
    this.socket.broadcast.emit("update-rooms", roomsAfterDelete);
  }
}
