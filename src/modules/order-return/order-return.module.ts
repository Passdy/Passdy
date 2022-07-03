import { Module } from '@nestjs/common';
import { OrderReturnService } from './order-return.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/models/entities/orders.entity';
import { OrderReturnRepository } from 'src/models/repositories/order_returns.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderReturnRepository]),
  ],
  providers: [OrderReturnService]
})
export class OrderReturnModule {}
