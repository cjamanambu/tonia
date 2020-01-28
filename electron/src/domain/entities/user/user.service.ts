import { UserInput } from './user.input';
import { IUser } from './user.interface';
import { getRepository } from 'typeorm';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UserService {

  constructor() {}

  public async createAndSave(user: UserInput): Promise<IUser> {
    return await getRepository(User).save({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      type: user.type,
      isRegistered: false,
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

  public registerUser(id: string, loginID: string) {
    return getRepository(User).update(id, { isRegistered: true, loginID });
  }
}
