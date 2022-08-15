import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'images',
})
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;
}
