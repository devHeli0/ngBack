import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Account, User } from '../frameworks/persistence/models';
var jwt = require('jsonwebtoken');

class RegisterController {
  public async register(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({
        where: { username },
      });

      if (user) {
        return res.json('Usuário já existe!');
      } else {
        const account = await Account.create();
        if (password.length < 8 || username.length < 3) {
          const answer = {
            message: 'Username ou Senha inválidos!',
          };
          res.send(answer);
          return;
        }
        user = await User.create({
          username,
          password: await bcrypt.hash(password, 8),
          accountId: account.id,
        });
        const answer = {
          message: 'Usuário cadastrado com sucesso!',
        };
        res.send(answer);
        return;
      }
    } catch (error) {
      const answer = {
        message: 'Falha ao cadastrar usuário, tente novamente!',
      };
      res.status(400).send(answer);
      return;
    }
  }
}

export default new RegisterController();
