import { validationResult } from 'express-validator'
import { Room } from '../../db'
import {MESSAGES} from '../../helpers/helper'
import {Response} from '../../models/Response'

export const createController = async (req, res) => {
  const response = new Response()
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    response.setStatus(false)
    response.setError(errors.array())
    return res.status(422).json(response)
  }
  try {
    // Created room
    const room = await Room.create(req.body)

    // Send response
    response.addMessage(MESSAGES.ROOMREGISTERED)
    response.setPayload(room)
    res.json(response)
    // Socket call
  } catch (err) {
    response.setStatus(false)
    response.addError(err.errors[0].message)
    return res.status(400).json(response)
  }
}

