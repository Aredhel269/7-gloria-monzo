import { MESSAGES } from '../../helpers/helper'
import { Response } from '../../models/Response'
import bcrypt from 'bcryptjs'
import { createToken } from '../../helpers/createToken'
import { User } from '../../db'

export const loginController = async (req, res) => {
  const response = new Response()

  try {
    // Missing post information
    if (!req.body.userName || !req.body.password) {
      response.setStatus(false)
      response.addError(MESSAGES.MISSINGUSERNAMEORPASS)
      return res.status(422).json(response)
    }
    const user = await User.findOne({ where: { userName: req.body.userName } })
    if (user) {
      // User found
      const valid = bcrypt.compareSync(req.body.password, user.password)
      if (valid) {
        // Valid password for this user
        response.setPayload({
          token: createToken(user),
          user
        })
        res.json(response)
      } else {
        // Wrong password for this user
        response.setStatus(false)
        response.addError(MESSAGES.WRONGUSERORPASS)
        res.json(response)
      }
    } else {
      // User not found
      response.setStatus(false)
      response.addError(MESSAGES.WRONGUSERORPASS)
      res.json(response)
    }
  } catch (err) {
    // Other errors
    response.setStatus(false)
    response.setError(err)
    res.status(422).json(response)
  }
}
