import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ILogin } from '../../domain/models/login/login.interface';

@Entity()
export class Login implements ILogin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column()
  role: string;

  @Column()
  userID: string;

}
