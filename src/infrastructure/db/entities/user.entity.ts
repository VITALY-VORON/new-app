import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

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
}