import { EntityRepository, Repository } from 'typeorm';
import { IUserRepositoryInterface } from '../user-repository.interface';
import { User } from '../../domain/entities/User';

@EntityRepository(User)
export class UserRepository  extends Repository<User> implements IUserRepositoryInterface {
  findByUsername(username: string): void {
  }
}
