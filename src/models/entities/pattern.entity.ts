import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'patterns',
})
export class Pattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
