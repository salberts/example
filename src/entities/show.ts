import {Entity, Column,  PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {CastEntity} from "./cast";

@Entity("shows")
export class ShowEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @ManyToMany(() => CastEntity, cast => cast.shows)
    @JoinTable({ name: "show_cast" })
    public cast!: CastEntity[];
}