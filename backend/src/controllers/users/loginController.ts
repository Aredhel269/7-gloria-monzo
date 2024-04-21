import { Request, Response } from 'express'
import { MESSAGES } from '../../helpers/helper'
import { Response as ResponseModel } from '../../models/Response'
import bcrypt from 'bcryptjs'
import { createToken } from '../../helpers/createToken'
import { User } from '../../db'

export const loginController = async (req: Request, res: Response) => {
  const response = new ResponseModel()

  try {
    // Verifica si les dades postades estan completes
    if (!req.body.userName || !req.body.password) {
      response.setStatus(false)
      response.addError(MESSAGES.MISSINGUSERNAMEORPASS)
      return res.status(422).json(response)
    }

    // Cerca l'usuari a la base de dades
    const user = await User.findOne({ where: { userName: req.body.userName } })

    if (user) {
      // Si l'usuari existeix, verifica la contrasenya
      const valid = bcrypt.compareSync(req.body.password, user.password)

      if (valid) {
        // Si la contrasenya és vàlida, crea i envia el token d'autenticació juntament amb l'usuari
        response.setPayload({
          token: createToken(user),
          user
        })
        return res.json(response)
      } else {
        // Si la contrasenya no és vàlida, envia un missatge d'error
        response.setStatus(false)
        response.addError(MESSAGES.WRONGUSERORPASS)
        return res.status(401).json(response)
      }
    } else {
      // Si l'usuari no existeix, envia un missatge d'error
      response.setStatus(false)
      response.addError(MESSAGES.WRONGUSERORPASS)
      return res.status(401).json(response)
    }
  } catch (err) {
    // En cas d'altres errors, envia un missatge d'error
    if (err instanceof Error) {
      response.setStatus(false)
      response.addError(err.message)
      return res.status(500).json(response)
    } else {
      response.setStatus(false)
      response.addError('An unknown error occurred')
      return res.status(500).json(response)
    }
  }
}
