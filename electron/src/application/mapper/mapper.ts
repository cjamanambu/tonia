import { LoginInput } from '../../domain/login/login.input';
import { injectable } from 'inversify';
import { SignupRequest } from '../../protocols/request/signup-request.protocol';
import { UserRequest } from '../../protocols/request/user-request.protocol';
import { UserInput } from '../../domain/user/user.input';

@injectable()
export class Mapper {

  constructor() {}

  public toLoginInput(from: SignupRequest): LoginInput {
    return new LoginInput(from.username, null, null, from.role, from.userID);
  }

  public toUserInput(from: UserRequest): UserInput {
    return new UserInput(from.firstname, from.lastname, from.email, from.phone, from.address, from.type);
  }
}
