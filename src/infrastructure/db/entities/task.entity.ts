import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}