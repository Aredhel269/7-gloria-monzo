import { User } from '../../db';
import { MESSAGES } from '../../helpers/helper';
import { Response } from '../../models/Response';
import bcrypt from 'bcryptjs';
import { Request, Response as ExpressResponse } from 'express';

export const unsubscribeController = async (req: Request, res: ExpressResponse) => {
  const response = new Response();

  try {
    if (!req.body.userName || !req.body.password) {
      response.setStatus(false);
      response.addError(MESSAGES.MISSINGUSERNAMEORPASS);
      return res.status(422).json(response);
    }
    const user = await User.findOne({ where: { userName: req.body.userName } });
    if (user) {
      const valid = bcrypt.compareSync(req.body.password, user.password);
      if (valid) {
        const countResponse = await User.destroy({
          where: {
            userId: user.userId
          }
        });
        response.setPayload({ deleted: countResponse > 0 });
        return res.json(response);
      } else {
        response.setStatus(false);
        response.addError(MESSAGES.WRONGUSERORPASS);
        return res.status(401).json(response);
      }
    } else {
      response.setStatus(false);
      response.addError(MESSAGES.WRONGUSERORPASS);
      return res.status(401).json(response);
    }
  } catch (err) {
    response.setStatus(false);
    response.setError(err);
    return res.status(422).json(response);
  }
};
