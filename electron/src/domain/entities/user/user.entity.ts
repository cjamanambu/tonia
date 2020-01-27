import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from './user.interface';

@Entity()
export class UserEntity implements IUser {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

}
