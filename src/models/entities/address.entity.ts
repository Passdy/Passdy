import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'address',
})
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address_type: AddressType;

  @Column()
  name: string;

  @Column()
  parent_id: number;
}

export enum AddressType {
  Province = 'province',
  District = 'district',
  Ward = 'ward',
}
