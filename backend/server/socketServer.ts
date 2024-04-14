import { Server } from 'socket.io'
import { UserSocket } from '../user/infrastructure/userSocket'
import { RoomSocket } from '../room/infrastructure/roomSocket'
import { UserMongoDbHandler } from '../user/infrastructure/repository/UserMongoDbHandler'
import { RoomMongoDbHandler } from '../room/infrastructure/repository/roomMongoDbHandler'

export class SocketServer {
  private readonly io
  constructor(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: {
        origin: '*'
      }
    })
  }

  async connect(): Promise<void> {
    this.io.on('connection', async (socket) => {
      const userSocket: UserSocket = new UserSocket(
        socket,
        new UserMongoDbHandler()
      )
      const roomSocket: RoomSocket = new RoomSocket(
        socket,
        new RoomMongoDbHandler()
      )

      await userSocket.connect(roomSocket)
      await roomSocket.connect()
    })
  }
}
