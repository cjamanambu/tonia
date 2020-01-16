import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Login {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  passwordSalt: string;

  @Column()
  passwordHash: string;

  @OneToOne(type => User, user => user.login, {
    eager: true
  })
  @JoinColumn()
  user: User;
}
