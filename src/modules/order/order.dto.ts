import { IsNotEmpty } from 'class-validator';
import {
  OrderTypeGive,
  OrderTypeReceive,
} from 'src/models/entities/orders.entity';

export class CreateOrderDto {
  user_id: number;

  @IsNotEmpty()
  type_give: OrderTypeGive;

  @IsNotEmpty()
  type_receive: OrderTypeReceive;

  @IsNotEmpty()
  cloth_num: number;

  address_name: string;
  phone: string;
  city_id: number;
  district_id: number;
  ward_id: number;
  address: string;
  address_type: string;

  created_at: string;
}
