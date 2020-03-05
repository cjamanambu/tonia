import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, TableInheritance } from 'typeorm';
import { IUser } from '../../domain/user';

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
  username: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  passwordHash: string;

  @Column()
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
}
