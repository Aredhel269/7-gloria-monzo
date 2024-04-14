import { Request, Response } from 'express'
import { JwtHandler } from "../../middelware/JwtHandler"

export const autentication = async (req: Request, res: Response) => {
    const jwtHandler = new JwtHandler()
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ error: "Necesario token para autenticacion" })
    }
    if (typeof token === 'string') {
        const decoded = await jwtHandler.jwtVerify(token)
        return res.send(decoded)
    }
}