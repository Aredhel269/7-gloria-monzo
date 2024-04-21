import * as middleware from '../middlewares/middleware'

import * as notFoundRouter from './api/notfound'
import roomsRouter from './api/rooms'
import usersRouter from './api/users'

// router.use('/players', middleware.checkToken, playersRouter)
import * as express from 'express'

const router = express.Router()

router.use('/users', usersRouter)

router.use('/rooms', middleware.checkToken, roomsRouter)
router.use('*', notFoundRouter)

module.exports = router
