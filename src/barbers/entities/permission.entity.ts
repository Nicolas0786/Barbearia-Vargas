import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn('increment')
    idPermission:number;

    @Column('varchar', )
}


