import { check } from 'express-validator'
import {MESSAGES} from '../../helpers/helper'

export const createValidation = [
  check('roomName', MESSAGES.ROOMNAMEREQUIRED).not().isEmpty()
]
