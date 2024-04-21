import { User, Room, UserRoom } from '../../db'
import { newMessage } from './newMessage'
export const enterRoom = async (serverSocket, userId, roomName) => {
  try {
    const user = await User.findByPk(userId)
    const newRoom = roomName ? await Room.findOne({ where: { roomName } }) : 0

    const oldUserRoom = await UserRoom.findOne({ where: { userId } })
    const oldRoom = oldUserRoom?.roomId
      ? await Room.findByPk(oldUserRoom.roomId)
      : 0

    await UserRoom.destroy({ where: { userId: user.userId } })

    if (newRoom) {
      await user.addRoom(newRoom)
    }

    const rooms = await Room.findAll({
      include: [{ model: User }]
    })

    if (roomName) {
      const data = {
        userId: null,
        roomName,
        message: `${user.displayName} join the room`
      }

      newMessage(serverSocket, data)
    }

    if (oldRoom !== 0 && newRoom === 0) {
      // User leaved room
      const data = {
        userId: null,
        roomName: oldRoom.roomName,
        message: `${user.displayName} left the room`
      }

      newMessage(serverSocket, data)
    }

    serverSocket.io.emit('update_user_room', { user, newRoom, rooms })
  } catch (err) {
    console.log('update_user_room fail:', err)
  }
}

