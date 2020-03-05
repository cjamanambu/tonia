import { injectable } from 'inversify';
import { ISignupRequest, ICreateUserRequest } from '../../protocols';
import { IUserInput } from '../../domain/user';
import { ILoginInput } from '../../domain/login';

export interface IMapper {
  toLoginInput(from: ISignupRequest): ILoginInput;
  toUserInput(from: ICreateUserRequest): IUserInput;
}

@injectable()
export class Mapper implements IMapper {

  constructor() {}

  public toLoginInput(from: ISignupRequest): ILoginInput {
    return {
      fullname: from.fullname,
      email: from.email,
      passwordHash: null,
      user: null
    };
  }

  public toUserInput(from: ICreateUserRequest): IUserInput {
    return {
      firstname: from.firstname,
      lastname: from.lastname,
      phone: from.phone,
      role: from.role,
      sex: from.sex,
      age: from.age,
    };
  }
}
