import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderBuy } from './order-buy.entity';

@Entity({
  name: 'coupons',
})
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  percent: number;

  @ManyToOne(() => OrderBuy, (orderBuy) => orderBuy.coupon)
  order_buys: OrderBuy

}
