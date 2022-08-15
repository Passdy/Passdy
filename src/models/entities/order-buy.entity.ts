import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Coupon } from './coupon.entity';
import { PaymentMethod } from './payment-method.entity';

export enum OrderBuyStatus {
  /** Create order buy */
  NEW = 1,
  /** Cancel order buy */
  CANCEL = 3,
  /** Order buy in progress */
  IN_PROGRESS = 4,
  /** Order buy delivered */
  DELIVERED = 5,
  /** Order paid */
  SUCCEEDED = 6,
  /** Order pending */
  PENDING = 7,
  /** Order  */
  PROCESSING = 8,
  /** Order returned */
  RETURNED = 9,

  /**
   * NEW -> IN_PROGRESS -> CANCEL
   *             | 
   *             |--> PROCESSING --> DELIVERED --> SUCCEEDED
   *                   |         |
   *                   |         |-->  RETURNED
   *                   |
   *                   |--> PENDING                      
   */
}

@Entity({
  name: 'order_buys',
})
export class OrderBuy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column()
  tax: number;

  @Column()
  delivery_fee: number

  @OneToMany(() => Coupon, (coupon) => coupon.order_buys)
  @JoinColumn({ name: "coupon_id" })
  coupon: Coupon
  
  @Column()
  status: number;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: "payment_method_id" })
  payment_method: PaymentMethod
}
