import { User, Room, Message } from '../../db'

export const newMessage = async (serverSocket, data) => {
  if (!data?.message) return false
  try {
    const { userId, roomName, message } = data
    const room = roomName ? await Room.findOne({ where: { roomName } }) : 0

    await Message.create({
      message,
      userId,
      roomId: room.roomId
    })

    const messages = await Message.findAll({
      where: { roomId: room.roomId },
      include: [
        {
          model: User,
          as: 'user'
        }
      ],
      order: [['createdAt', 'ASC']]
    })

    serverSocket.io.emit('update_messages', room.roomName, messages)
  } catch (err) {
    console.log('update_messages fail:', err)
  }
}
