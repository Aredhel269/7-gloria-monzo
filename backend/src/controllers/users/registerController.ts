import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { Response as ResponseModel } from '../../models/Response'
import { MESSAGES as helper } from '../../helpers/helper'
import { User } from '../../db'

export const registerController = async (req: Request, res: Response) => {
  const response = new ResponseModel()
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    response.setStatus(false)
    response.setError(errors.array())
    return res.status(422).json(response)
  }

  try {
    const existingUser = await User.findOne({
      where: { userName: req.body.userName }
    })
    if (existingUser) {
      response.setStatus(false)
      response.addError(helper.USERNAMECONFLICT)
      return res.status(409).json(response)
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user = await User.create(req.body)
    response.addMessage(helper.USERREGISTERED)
    response.setPayload(user)
    res.json(response)
  } catch (err: any) {
    response.setStatus(false)
    let errorMsg = err.errors?.[0]?.message || err.message
    if (errorMsg === 'userName must be unique') {
      errorMsg = helper.USERNAMECONFLICT
    }
    response.addError(errorMsg)
    return res.status(500).json(response)
  }
}
