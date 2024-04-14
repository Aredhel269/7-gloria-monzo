import { AppServer } from './appServer'
import http from 'http'
import express from 'express'
import { SocketServer } from './socketServer'

export class App {
  server?: AppServer
  io?: SocketServer

  async start(): Promise<void> {
    const port = process.env.PORT ?? '4000'
    const app = express()
    const httpServer = http.createServer(app)
    this.server = new AppServer(port, httpServer) // creem el servidor express (app.ts). Enviem httpServer pq funcioni socket.io
    this.io = new SocketServer(httpServer) //creem el servidor de socket)

    // await this.io.listen()
    await this.io.connect()
    await this.server.listen()
  }
}
