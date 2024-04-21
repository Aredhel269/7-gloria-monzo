// routes/api/rooms.js
import router from 'express'
import {getRoomsController} from '../../controllers/rooms/getRoomsController'
import {createController} from '../../controllers/rooms/createController'
import {createValidation} from '../../controllers/rooms/createValidation'

import 'dotenv'

export default router

import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  await getRoomsController(req, res)
})

router.post('/create', createValidation, async (req, res) => {
  await createController(req, res)
})
