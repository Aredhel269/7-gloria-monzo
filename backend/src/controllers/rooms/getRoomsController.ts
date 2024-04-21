import { Request, Response } from 'express'
import { Room } from '../../db'
import { Response as ResponseModel } from '../../models/Response' // Importació amb nom per evitar conflictes

export const getRoomsController = async (req: Request, res: Response) => {
  const response = new ResponseModel()
  try {
    const rooms = await Room.findAll()

    response.setPayload(rooms)
    res.status(200).json(response)
  } catch (err: unknown) {
    if (err instanceof Error) {
      response.setStatus(false)
      response.addError(err.message)
      res.status(400).json(response)
    } else {
      response.setStatus(false)
      response.addError('An unknown error occurred')
      res.status(500).json(response)
    }
  }
}
