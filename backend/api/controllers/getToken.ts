import { JwtHandler } from "../../middelware/JwtHandler"
import { Request, Response } from 'express'

export const getToken = async (req: Request, res: Response) => {
    const name = req.body.name
    const jwtHandler = new JwtHandler()
    const token = await jwtHandler.jwtSign(name)
    res.send(token)

}