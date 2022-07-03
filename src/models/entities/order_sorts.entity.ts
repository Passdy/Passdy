import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'order_sorts',
})
export class OrderSort {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  cloth_num_receive: number;

  @Column()
  cloth_num_pass: number;

  @Column()
  created_at: string;
}

