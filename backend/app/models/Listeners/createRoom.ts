import { Room } from '../../db'
export const createRoom = async (serverSocket, roomName) => {
  try {
    await Room.create(roomName)
    const rooms = await Room.findAll()
    serverSocket.io.emit('update_rooms', rooms)
  } catch (err) {
    console.log('Create room fail:', err)
  }
}