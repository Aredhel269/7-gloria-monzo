import express from 'express'
import 'dotenv'
import { json, urlencoded } from 'body-parser'
import apiRouter from './routes/route'
import cors from 'cors'
import { createServer } from 'http'
import ServerSocket from './models/ServerSocket'

// Create express application
const app = express()

// Server handling
const httpServer = createServer(app)

// Start the Socket
new ServerSocket(httpServer)

// Cors for express server
app.use(cors())

import './db'

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/', apiRouter)

httpServer.listen(process.env.SERVER_PORT, () =>
  console.log('Server is running')
)
