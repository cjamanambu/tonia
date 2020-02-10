import { IUsecase } from '../usecase.interface';
import { inject, injectable } from 'inversify';
import { ICreateUserRequest } from '../../../protocols';
import { TYPES } from '../../constants';
import { UserService } from '../../../infrastructure/services';
import { Mapper } from '../../mapper';
import { IUser } from '../../../domain/user';

@injectable()
export class CreateuserUsecase implements IUsecase {

  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Mapper) private mapper: Mapper
  ) {}

  public async execute(userRequest: ICreateUserRequest): Promise<IUser> {
    const userInput = this.mapper.toUserInput(userRequest);
    return await this.userService.createAndSave(userInput);
  }
}
