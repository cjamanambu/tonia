// App
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';

// entity
import { User } from '../entities/user.entity';

// domain
import { IUser } from '../../domain/models/user/user.interface';
import { IUserService } from '../../domain/models/user/user.service';
import { UserInput } from '../../domain/models/user/user.input';

@injectable()
export class UserService implements IUserService {

  // private userRepository = getRepository(User);

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

  public async registerUser(id: string, loginID: string) {
    await getRepository(User).update(id, { isRegistered: true, loginID });
  }
}
