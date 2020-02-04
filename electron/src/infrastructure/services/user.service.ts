// App
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';

// User
import { User } from '../entities';
import { IUser, IUserService, UserInput } from '../../domain/user';

@injectable()
export class UserService implements IUserService {

  public async createAndSave(user: UserInput): Promise<IUser> {
    return await getRepository(User).save({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      address: user.address,
      type: user.type,
      loginID: null
    });
  }

  public async findByName(firstname: string, lastname: string): Promise<IUser> {
    return await getRepository(User).findOne({
      where: { firstname, lastname }
    });
  }

  public async findByID(id: string): Promise<IUser> {
    return getRepository(User).findOne({
      where: { id }
    });
  }

  public async registerUser(id: string, loginID: string) {
    await getRepository(User).update(id, { loginID });
  }
}
