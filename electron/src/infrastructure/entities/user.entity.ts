import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../../domain/user';

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
  address: string;

  @Column()
  type: string;

  @Column({nullable: true})
  loginID: string;

}
