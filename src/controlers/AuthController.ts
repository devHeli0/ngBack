import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../frameworks/persistence/models'
const jwt = require('jsonwebtoken')

class AuthController {
  public async getAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers

    if (!authorization)
      return res.status(401).json({ message: 'Acesso restrito!' })

    const token = authorization.replace('Bearer', '').trim()

    try {
      const decoded = jwt.verify(token, 'secret')

      const user = await UserModel.findOne({
        where: { id: decoded.id },
      })

      if (user) {
        res.status(200).send()
      } else {
        res.status(409).send()
      }
      next()
      return
    } catch {
      return res.status(401).json({ mensagem: 'Token inválido!' })
    }
  }
}
export default new AuthController()
