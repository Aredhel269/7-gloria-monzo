import jwt from 'jwt-simple';
import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import { Response as CustomResponse } from '../models/Response';
import { MESSAGES } from '../helpers/helper';
import 'dotenv/config';

export const addNoCacheHeader = (_req: Request, res: Response, next: NextFunction) => {
  res.set({ 'Cache-Control': 'no-cache' });
  next();
};

export const checkToken = (
  req: Request & { usuarioId?: any },
  res: Response,
  next: NextFunction
) => {
  const response = new CustomResponse()
  const userToken = Array.isArray(req.headers['user-token'])
    ? req.headers['user-token'][0]
    : req.headers['user-token']

  if (!userToken) {
    response.setStatus(false)
    response.addError(MESSAGES.MISSINGTOKENHEADER)
    return res.status(401).json(response)
  }

  let payload: any = {}

  try {
    payload = jwt.decode(userToken, process.env.JWT_SECRET_KEY || '')
  } catch (err) {
    handleTokenError(res, response, MESSAGES.INVALIDTOKEN)
    return
  }

  if (payload.exp && payload.exp < moment().unix()) {
    handleTokenError(res, response, MESSAGES.TOKENEXPIRED)
    return
  }

  req.usuarioId = payload.usuarioId
  next()
}

const handleTokenError = (
  res: Response,
  response: CustomResponse,
  errorMessage: string
) => {
  response.setStatus(false);
  response.addError(errorMessage);
  res.status(401).json(response);
};
