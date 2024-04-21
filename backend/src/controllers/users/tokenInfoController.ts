import { MESSAGES } from '../../helpers/helper'
import { Response } from '../../models/Response'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  [key: string]: any
}

import { Request, Response as ExpressResponse } from 'express'

export const tokenInfoController = async (
  req: Request,
  res: ExpressResponse
) => {
  const response = new Response()

  if (!req.body.token) {
    response.setStatus(false)
    response.addError(MESSAGES.MISSINGTOKEN)
    return res.status(422).json(response)
  } else {
    try {
      const payload: JwtPayload | null = jwt.verify(
        req.body.token,
        process.env.JWT_SECRET_KEY || ''
      ) as JwtPayload | null

      if (!payload) {
        response.setStatus(false)
        response.addError(MESSAGES.INVALIDTOKEN)
        return res.status(401).json(response)
      }

      // Comprovar si el token ha caducat
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        response.setStatus(false)
        response.addError(MESSAGES.TOKENEXPIRED)
        return res.status(401).json(response)
      }

      response.setPayload(payload)
      res.json(response)
    } catch (err) {
      response.setStatus(false)
      response.addError(MESSAGES.INVALIDTOKEN)
      return res.status(401).json(response)
    }
  }
}
