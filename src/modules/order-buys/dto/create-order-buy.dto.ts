import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/models/entities/product.entity';

export class CreateOrderBuyDto {
  @ApiProperty()
  @IsNotEmpty()
  total_price: number;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  @IsNotEmpty()
  delivery_fee: number;

  @ApiProperty()
  coupon_id: number;

  @ApiProperty()
  @IsNotEmpty()
  payment_method_id: number;

  @ApiProperty()
  @IsNotEmpty()
  products: Product[];

}
