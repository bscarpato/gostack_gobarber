import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';

interface Request{
  name:string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepo = getRepository(User);

    const checkUserExists = await usersRepo.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepo.save(user);

    return user;
  }
}

export default CreateUserService;
