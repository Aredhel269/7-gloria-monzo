import { User } from '../../db'
import {MESSAGES} from '../../helpers/helper'
import {Response} from '../../models/Response'
import bcrypt from 'bcryptjs'

export const unsubscribeController = async (req, res) => {
  const response = new Response()

  try {
    if (!req.body.userName || !req.body.password) {
      response.setStatus(false)
      response.addError(MESSAGES.MISSINGUSERNAMEORPASS)
      return res.status(422).json(response)
    }
    const user = await User.findOne({ where: { userName: req.body.userName } })
    if (user) {
      const valid = bcrypt.compareSync(req.body.password, user.password)
      if (valid) {
        const countResponse = User.destroy({
          where: {
            userId: user.userId
          }
        })
        response.setPayload({ deleted: !!countResponse })
        res.json(response)
      } else {
        response.setStatus(false)
        response.addError(MESSAGES.WRONGUSERORPASS)
        res.status(401).json(response)
      }
    } else {
      response.setStatus(false)
      response.addError(MESSAGES.WRONGUSERORPASS)
      res.status(401).json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.setError(err)
    res.status(422).json(response)
  }
}