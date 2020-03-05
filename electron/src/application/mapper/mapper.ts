import { injectable } from 'inversify';
import { ICreateUserRequest } from '../../protocols';
import { IUserInput } from '../../domain/user';

export interface IMapper {
  toUserInput(from: ICreateUserRequest): IUserInput;
}

@injectable()
export class Mapper implements IMapper {

  constructor() {}

  public toUserInput(from: ICreateUserRequest): IUserInput {
    return {
      firstname: from.firstname,
      lastname: from.lastname,
      phone: from.phone,
      email: from.email,
      role: from.role,
      sex: from.sex,
      age: from.age,
    };
  }
}
