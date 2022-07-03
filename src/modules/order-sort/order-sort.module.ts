import { Module } from '@nestjs/common';
import { OrderSortService } from './order-sort.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/models/entities/orders.entity';
import { OrderSortRepository } from 'src/models/repositories/order_sorts.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderSortRepository]),
  ],
  providers: [OrderSortService]
})
export class OrderSortModule {}
