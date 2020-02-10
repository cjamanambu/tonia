// App
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

// User
import { User } from '../entities';
import { IUser, IUserService, UserInput } from '../../domain/user';


@injectable()
export class UserService implements IUserService {

  public async createAndSave(userInput: UserInput): Promise<IUser> {
    const { firstname, lastname, phone, role } = userInput;
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = null;
    user.email = null;
    user.phone = phone;
    user.address = null;
    user.role = role;
    user.login = null;
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error(`Error! Validation failed for the new user!`);
    }
    return await getRepository(User).save(user);
  }

  public async findByEmail(email: string): Promise<IUser> {
    return await getRepository(User).findOne({
      where: { email }
    });
  }

  public async findByFullname(fullname: string): Promise<IUser> {
    const names = fullname.split(' ');
    return this.findByName(names[0], names[1]);
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

  // public async registerUser(id: string, loginID: string) {
  //   await getRepository(User).update(id, { loginID });
  // }
}
