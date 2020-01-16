import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Login } from './Login';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(type => Login, login => login.user)
  login: Login;
}
