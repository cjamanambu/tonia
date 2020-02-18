import { IUsecase } from '../usecase.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../constants';
import { IMapper } from '../../mapper';
import { ICreateUserRequest } from '../../../protocols';
import { IUser, IUserService } from '../../../domain/user';

@injectable()
export class CreateuserUsecase implements IUsecase {

  constructor(
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.Mapper) private mapper: IMapper
  ) {}

  public async execute(userRequest: ICreateUserRequest): Promise<IUser> {
    const userInput = this.mapper.toUserInput(userRequest);
    return await this.userService.createAndSave(userInput);
  }
}
