import { IsNotEmpty, IsEmpty } from 'class-validator';
import {
  OrderTypeGive,
  OrderTypeReceive,
  OrderStatus
} from 'src/models/entities/orders.entity';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  email: string;

  user_id: number;
   
  @IsNotEmpty()
  type_give: OrderTypeGive;

  @IsNotEmpty()
  type_receive: OrderTypeReceive;

  @IsNotEmpty()
  cloth_num: number;

  @IsNotEmpty()
  address_name: string;

  @IsNotEmpty()
  phone: string;
  
  city_id: number;
  district_id: number;
  ward_id: number;

  @IsNotEmpty()
  address: string;
  address_type: string;

  created_at: string;

  status: OrderStatus;
}

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number
}

export class SortUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  num_recieve: number

  @ApiProperty()
  @IsNotEmpty()
  pass: number
}

export class ShipUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  number_of_clothes: number
}

export class ReturnUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  number_of_clothes: number

  @ApiProperty()
  @IsNotEmpty()
  ship_fee: number
}