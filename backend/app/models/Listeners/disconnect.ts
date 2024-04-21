import { enterRoom } from './enterRoom'

export const disconnect = async (serverSocket, socket) => {
  const uid = serverSocket.GetUidFromSocketId(socket.id)

  if (uid) {
    const user = JSON.parse(uid)
    enterRoom(serverSocket, user.userId, 0)

    delete serverSocket.users[uid]
    const users = Object.values(serverSocket.users)

    serverSocket.SendMessage('user_disconnected', users, socket.id)
  }
}
