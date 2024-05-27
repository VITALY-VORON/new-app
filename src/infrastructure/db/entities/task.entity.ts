import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from './group.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  userId: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @Column('varchar')
  @IsNotEmpty()
  description: string;

  @Column('varchar')
  @IsNotEmpty()
  stage: string;

  @Column()
  @IsNotEmpty()
  createdAt: string | null;

  @Column()
  @IsNotEmpty()
  endDate: string | null;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.tasks)
  group: GroupEntity;
}
