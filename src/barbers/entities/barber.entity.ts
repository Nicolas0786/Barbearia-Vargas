import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barber {
  @PrimaryGeneratedColumn('increment')
  idBarber: number;

  @Column('varchar', { length: 80 })
  name: string;

  @Column('varchar', { length: 80 })
  surName: string;

  @Column('varchar', { length: 80 })
  login: string;

  @Column('varchar', { length: 60 })
  password: string;
}
