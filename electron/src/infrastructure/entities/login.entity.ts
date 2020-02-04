import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ILogin } from '../../domain/login';

@Entity()
export class Login implements ILogin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column()
  role: string;

  @Column()
  userID: string;

}
