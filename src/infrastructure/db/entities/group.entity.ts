import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNotEmpty } from 'class-validator';
import { TaskEntity } from './task.entity';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.group)
  tasks: TaskEntity[];
}
