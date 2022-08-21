import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  sort_status: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // product_status: string;

  @ApiProperty()
  @IsNotEmpty()
  product_type_id: string;

  @ApiProperty()
  @IsNotEmpty()
  size_id: string;

  @ApiProperty()
  @IsNotEmpty()
  color_id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  measure: string;

  @ApiProperty()
  @IsNotEmpty()
  pattern_id: string;

  @ApiProperty()
  @IsNotEmpty()
  material_id: string;

  @ApiProperty()
  @IsNotEmpty()
  branch_id: string;

  @ApiProperty()
  discount_percent: number;
}
