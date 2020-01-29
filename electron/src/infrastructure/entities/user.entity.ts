import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../../domain/models/user/user.interface';

@Entity()
export class User implements IUser {

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

  @Column()
  type: string;

  @Column()
  isRegistered: boolean;

  @Column({nullable: true})
  loginID: string;

}
