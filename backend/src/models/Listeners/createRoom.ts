import { Room } from '../../db'
import { Server } from 'socket.io'
export const createRoom = async (serverSocket: Server, roomName: string) => {
  try {
    await Room.create(roomName)
    const rooms = await Room.findAll()
    serverSocket.io.emit('update_rooms', rooms)
  } catch (err) {
    console.log('Create room fail:', err)
  }
}
