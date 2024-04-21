import {MESSAGES} from '../../helpers/helper'
import {Response} from '../../models/Response'
import jwt from 'jwt-simple'

export const tokenInfoController = async (req, res) => {
  const response = new Response()

  if (!req.body.token) {
    response.setStatus(false)
    response.addError(MESSAGES.MISSINGTOKEN)
    return res.status(422).json(response)
  } else {
    try {
      const payload = jwt.decode(
        req.body.token,
        process.env.JWT_SECRET_KEY || ''
      )
      response.setPayload(payload)
      res.json(response)
    } catch (err) {
      response.setStatus(false)
      response.addError(MESSAGES.INVAIDTOKEN)
      return res.status(401).json(response)
    }
  }
}
