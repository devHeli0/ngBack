import { NextFunction, Request, Response } from 'express'
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes'

import jwt from 'jsonwebtoken'

class AuthMiddleware {
  public authUserByToken(secret: string, fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(ReasonPhrases.UNAUTHORIZED)
      }

      const token = authorization.replace('Bearer', '').trim()

      try {
        const decoded: string | undefined = jwt.verify(token, secret)

        const tokenFields = { id: 'id' }
        fields.forEach((field) => {
          tokenFields[field] = decoded[field]
        })

        Object.assign(req, tokenFields)

        return next()
      } catch {
        return res.status(401).json({ mensagem: 'Token inválido!' })
      }
    }
  }
}

export default new AuthMiddleware()
