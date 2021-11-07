import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../model/User';

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

    const token = sign({ }, 'b98bb54b85af9b8f4f4bb6f20effb048', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
