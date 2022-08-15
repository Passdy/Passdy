import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'materials',
})
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
