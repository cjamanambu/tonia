import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ILogin } from '../../domain/login';
import { User } from './user.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class Login implements ILogin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(type => User, user => user.login, {
    eager: true,
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: User;

}
