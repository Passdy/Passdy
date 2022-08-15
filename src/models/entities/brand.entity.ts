import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'brands',
})
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;
}
