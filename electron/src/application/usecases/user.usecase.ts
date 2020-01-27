import { User } from '../../domain/entities/User';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { getCustomRepository } from 'typeorm';

export class UserUsecase {

  public async createUser() {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.create();
    user.firstName = 'Test';
    user.lastName = 'User';
    await userRepository.save(user);
  }

}
