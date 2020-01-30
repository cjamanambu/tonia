import { IUsecase } from '../usecase.interface';
import { UserRequest } from '../../../protocols/request/user-request.protocol';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../constant/types';
import { UserService } from '../../../infrastructure/services/user.service';
import { Mapper } from '../../mapper/mapper';

@injectable()
export class CreateuserUsecase implements IUsecase {

  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Mapper) private mapper: Mapper
  ) {}

  public async execute(userRequest: UserRequest) {
    const userInput = this.mapper.toUserInput(userRequest);
    await this.userService.createAndSave(userInput);
  }
}
