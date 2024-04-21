import {log} from '../../helpers/log'

export const handshake = (serverSocket, socket, loggedUser, callback) => {
  log('Handshake recieved from ' + socket.id)

  // Check if this is a reconnection
  const reconnected = Object.values(serverSocket.users).includes(socket.id)

  if (reconnected) {
    log('This user has reconnected')
    const uid = serverSocket.GetUidFromSocketId(socket.id)
    const users = Object.values(serverSocket.users)

    if (uid) {
      log('Sending callback for reconnect ...')
      callback(uid, users)
      return
    }
  }

  // Register logged user
  const uid = JSON.stringify({
    userId: loggedUser.userId,
    userName: loggedUser.userName,
    displayName: loggedUser.displayName
  })
  serverSocket.users[uid] = socket.id
  const users = Object.values(serverSocket.users)
  log('Sending callback for handshake ...')
  callback(uid, users)

  // Send new user to all connected users
  serverSocket.SendMessage(
    'user_connected',
    users.filter((id) => id !== socket.id),
    users
  )
}

