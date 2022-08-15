import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'colors',
})
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;
}
