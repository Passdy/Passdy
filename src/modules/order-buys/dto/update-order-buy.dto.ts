import { PartialType } from '@nestjs/swagger';
import { CreateOrderBuyDto } from './create-order-buy.dto';

export class UpdateOrderBuyDto extends PartialType(CreateOrderBuyDto) {}
