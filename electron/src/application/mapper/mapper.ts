import { injectable } from 'inversify';
import { ISignupRequest, ICreateUserRequest } from '../../protocols';
import { UserInput } from '../../domain/user';
import { LoginInput } from '../../domain/login';

export interface IMapper {
  toLoginInput(from: ISignupRequest): LoginInput;
  toUserInput(from: ICreateUserRequest): UserInput;
}

@injectable()
export class Mapper implements IMapper {

  constructor() {}

  public toLoginInput(from: ISignupRequest): LoginInput {
    return new LoginInput(from.fullname, from.email, null, null);
  }

  public toUserInput(from: ICreateUserRequest): UserInput {
    return new UserInput(from.firstname, from.lastname, from.phone, from.role);
  }
}
