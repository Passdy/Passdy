import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'order_returns',
})
export class OrderReturn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  cloth_num_return: number;

  @Column()
  ship_fee: number;

  @Column()
  created_at: string;
}

