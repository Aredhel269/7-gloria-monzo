import express from 'express'
import logger from 'morgan' // programari intermediari Node.js i Express per registrar les sol·licituds HTTP i els errors

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000 // port per defecte 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

// escolta la connexió
io.on('connection', (socket) => {
    console.log ('a user has connected')
// escolta la desconnexió
    socket.on('disconnect', ()=> {
        console.log('a user has disconnected')
    })
// servidor emet el missatge a tothom (broadcast)
    socket.on('chat message', (msg)=> {
        io.emit('chat message: ', msg)
    })
})
app.use(logger('dev')) // que l'app utilitzi el logger de morgan en mode desenvolupador
// a la consola surt 'GET / 304 

app.get('/', (req, res) => { // a la pàgina principal  (/)
    //res.send('<h1> Això és el xató</h1>') // servim un string però volem servir un arxiu
    res.sendFile(process.cwd() + '/client/index.html') // cwd -> current working directory La carpeta on s'ha inicialitzat el proces, especifiquem la ruta

})

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})                                                                                                                         