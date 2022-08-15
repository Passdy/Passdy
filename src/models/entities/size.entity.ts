import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'sizes',
})
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;
}
