import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { GroupEntity } from './group.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('varchar')
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups: GroupEntity[];
}
