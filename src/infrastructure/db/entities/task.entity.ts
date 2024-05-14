import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

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

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    user: UserEntity;
}