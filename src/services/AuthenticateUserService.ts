import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../model/User';
import authConfig from '../config/auth';

interface Request{
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request) : Promise<{user: User, token: string}> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne({ where: { email } });

    if (!user) {
      throw new Error('Combinação de e-mail/senha errada.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Combinação de e-mail/senha errada.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
