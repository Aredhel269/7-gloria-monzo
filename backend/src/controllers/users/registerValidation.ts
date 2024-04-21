import { check } from 'express-validator'
import {MESSAGES} from '../../helpers/helper'

export const registerValidation = [
  check('userName', MESSAGES.USERREQUIRED).not().isEmpty(),
  check('displayName', MESSAGES.DISPLAYNAMEREQUIRED).not().isEmpty(),
  check('password', MESSAGES.PASSWORDREQUIRED).not().isEmpty()
]