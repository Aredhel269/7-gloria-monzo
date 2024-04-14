import jwt from "jsonwebtoken"

export class JwtHandler {

  async jwtSign(name: string) {
    const secretKey: string = process.env.JWT_KEY!
    const token = await jwt.sign({ name }, secretKey, {
      expiresIn: '1d'
    })
    return token
  }

  async jwtVerify(token: string) {
    if (typeof token === 'string') {
      const secretKey: string = process.env.JWT_KEY!
      try {
        const decoded = await jwt.verify(token, secretKey)
        return decoded
      } catch (error) {
        return false
      }
    }
  }
}