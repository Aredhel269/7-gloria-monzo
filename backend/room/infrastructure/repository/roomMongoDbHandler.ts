import { getDb } from "../../../database/mongoConnections";
import { Room, TMessage } from "../../domain/entities/IRoom";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";

export class RoomMongoDbHandler implements IRoomRepository {

    async updateMessages(msg: TMessage) {
        let result: Room[] = []
        const db = await getDb()
        await db.collection<Room>('rooms').updateOne({ name: msg.room }, {
            $push: {
                messages: {
                    text: msg.text,
                    owner: msg.owner,
                    room: msg.room,
                }
            }
        })
        const rooms = await db.collection<Room>('rooms').find()
        await rooms.forEach((room) => {
            result.push(room)
        })
        return result
    }

    async findRoom(room: Room) {
        const db = await getDb()
        const exists = await db.collection<Room>('rooms').findOne({ name: room.name })
        return exists
    }
    async getRoom(salaPrincipal: string): Promise<Room> {
        const db = await getDb()
        const room = await db.collection<Room>('rooms').findOne({ name: salaPrincipal })
        return room!
    }
    async getRooms(userName: string | null) {
        const db = await getDb()
        let rooms
        if (userName) rooms = await db.collection<Room>('rooms').find({ name: userName })
        if (!userName) rooms = await db.collection<Room>('rooms').find()
        const listOfRooms: Room[] = []
        await rooms?.forEach((room) => {
            listOfRooms.push(room)
        })
        return listOfRooms
    }

    async createRoom(room: Room) {
        const db = await getDb()
        await db.collection<Room>('rooms').insertOne({
            name: room.name,
            owner: room.owner,
            pass: room.pass,
            users: [],
            messages: []
        })
    }

    async joinRoom(roomToJoin: Room | Room, user: string) {
        const db = await getDb()
        await db.collection<Room>('rooms').updateOne({ name: roomToJoin.name }, { $push: { users: user } })
    }

    async leaveRoom(roomToLeave: string, user: string) {
        const db = await getDb()
        await db.collection<Room>('rooms').updateOne({ name: roomToLeave }, { $pull: { users: user } })
        const d = await db.collection<Room>('rooms').findOne({ name: roomToLeave })
    }

    async deleteRoom(room: Room) {
        const db = await getDb()
        await db.collection<Room>('rooms').deleteOne({ name: room.name })
    }

    async deleteRoomsOnDisconnect(userName: string) {
        const db = await getDb()
        await db.collection<Room>('rooms').deleteMany({
            owner: userName,
            $or: [
                { users: { $exists: false } },
                { users: { $size: 0 } },
                { users: [userName] }
            ]
        })
        const roomsAfterDelete = await db.collection<Room>('rooms').find()
        const listOfRooms: Room[] = []
        await roomsAfterDelete?.forEach((room) => {
            listOfRooms.push(room)
        })
        return listOfRooms
    }
}