import {Entity, Column,  PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {ShowEntity} from "./show";

@Entity("cast")
export class CastEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
    })
    birthday: Date;

    @ManyToMany(() => ShowEntity)
    public shows!: ShowEntity[];
}