import moment from 'moment'
import jwt from 'jwt-simple'

export const createToken = (user: { userId: any; userName: any; displayName: any }) => {
  const payload = {
    userId: user.userId,
    userName: user.userName || '',
    displayName: user.displayName || '',
    createdAt: moment().unix(),
    expiredAt: moment().add(24, 'hours').unix()
  }
  return jwt.encode(payload, process.env.JWT_SECRET_KEY || '')
}

