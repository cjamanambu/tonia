import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { ILogin } from './login.interface';

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
