import { LoginInput } from '../../domain/entities/login/login.input';
import { injectable } from 'inversify';
import { SignupRequest } from '../../protocols/request/signup-request.protocol';

@injectable()
export class Mapper {

  constructor() {}

  public toLoginInput(from: SignupRequest): LoginInput {
    return new LoginInput(from.username, null, null, from.role, from.userID);
  }
}
