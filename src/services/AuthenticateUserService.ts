import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../model/User';

interface Request{
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request) : Promise<{user: User}> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne({ where: { email } });

    if (!user) {
      throw new Error('Combinação de e-mail/senha errada.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Combinação de e-mail/senha errada.');
    }

    return { user };
  }
}

export default AuthenticateUserService;
