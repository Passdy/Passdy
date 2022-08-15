import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'payment_methods',
})
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
