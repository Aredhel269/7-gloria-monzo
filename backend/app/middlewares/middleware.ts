import jwt from 'jwt-simple'
import moment from 'moment'
import {Response} from '../models/Response'
import {MESSAGES} from '../helpers/helper'
import 'dotenv/config'

export const addNoCacheHeader = (_req: any, res: { set: (arg0: { 'Cache-Control': string }) => void }, next: () => void) => {
  res.set({
    'Cache-Control': 'no-cache'
  })
  next()
}

export const checkToken = (
  req: { headers: { [x: string]: any }; usuarioId: any },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: Response): any; new (): any }
    }
  },
  next: () => void
) => {
  const response = new Response()
  const userToken = req.headers['user-token']
  if (!userToken) {
    response.setStatus(false)
    response.addError(MESSAGES.MISSINGTOKENHEADER)
    return res.status(401).json(response)
  }

  let payload: any = {}

  try {
    payload = jwt.decode(userToken, process.env.JWT_SECRET_KEY || '')
  } catch (err) {
    response.setStatus(false)
    response.addError(MESSAGES.INVAIDTOKEN)
    return res.status(401).json(response)
  }

  if (payload.exp && payload.exp < moment().unix()) {
    response.setStatus(false)
    response.addError(MESSAGES.TOKENEXPIRED)
    return res.status(401).json(response)
  }

  req.usuarioId = payload.usuarioId

  next()
}


