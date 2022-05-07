import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  type_give: OrderTypeGive;

  @Column()
  type_receive: OrderTypeReceive;

  @Column()
  cloth_num: number;

  @Column()
  address_name: string;

  @Column()
  phone: string;

  @Column()
  city_id: number;

  @Column()
  district_id: number;

  @Column()
  ward_id: number;

  @Column()
  address: string;

  @Column()
  address_type: string;

  @Column()
  created_at: string;
}

export enum OrderTypeGive {
  Sell = 'sell',
  Donate = 'donate',
}

export enum OrderTypeReceive {
  Recycling = 'recycling',
  Resend = 'resend',
}

export const OrderTypeGiveMessage = {
  [OrderTypeGive.Sell] : 'Pass',
  [OrderTypeGive.Donate] : 'Từ thiện'
}

export const OrderTypeReceiveMessage = {
  [OrderTypeReceive.Recycling] : 'Tái chế',
  [OrderTypeReceive.Resend] : 'Gửi trả'
}
