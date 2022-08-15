import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { OrderBuy } from './order-buy.entity';

@Entity({
  name: 'shipping',
})
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToOne(() => OrderBuy)
  @JoinColumn({ name: "order_buy_id" })
  order_buy: OrderBuy

  @Column()
  receiver: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  status: string;
}
