import { UserInput } from './user.input';
import { IUser } from './user.interface';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UserService {

  public async create(user: UserInput): Promise<IUser> {
    console.log('user service');
    return getRepository(UserEntity).save({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
  }

  public async get(id: string): Promise<IUser> {
    return getRepository(UserEntity).findOneOrFail({
      where: {id}
    });
  }
}
