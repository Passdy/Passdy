import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'carts',
})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_key: string;

  // @Column()
  // user_id: number;
}
