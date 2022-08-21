import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderBuysService } from './order-buys.service';
import { CreateOrderBuyDto } from './dto/create-order-buy.dto';
import { UpdateOrderBuyDto } from './dto/update-order-buy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order-buys')
@Controller('order-buys')
export class OrderBuysController {
  constructor(private readonly orderBuysService: OrderBuysService) {}

  @Post()
  create(@Body() createOrderBuyDto: CreateOrderBuyDto) {
    return this.orderBuysService.create(createOrderBuyDto);
  }

  @Get()
  findAll() {
    return this.orderBuysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderBuysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderBuyDto: UpdateOrderBuyDto) {
    return this.orderBuysService.update(+id, updateOrderBuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderBuysService.remove(+id);
  }
}
