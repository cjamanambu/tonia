import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, TableInheritance } from 'typeorm';
import { IsInt, Length, IsEmail, IsOptional, IsAlphanumeric } from 'class-validator';
import { IUser } from '../../domain/user';
import { Login } from './login.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } } )
export class User implements IUser {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({nullable: true})
  @IsOptional()
  @Length(4, 20)
  username: string;

  @Column({nullable: true})
  @IsOptional()
  @IsEmail()
  email: string;

  @Column()
  @Length(5, 11)
  phone: string;

  @Column({nullable: true})
  address: string;

  @Column()
  role: string;

  @Column()
  age: string;

  @Column()
  sex: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(type => Login, login => login.user, { onDelete: 'SET NULL' })
  login: Login;

}
