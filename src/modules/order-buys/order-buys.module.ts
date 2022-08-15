import { Module } from '@nestjs/common';
import { OrderBuysService } from './order-buys.service';
import { OrderBuysController } from './order-buys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBuy } from 'src/models/entities/order-buy.entity';
import { OrderBuyRepository } from 'src/models/repositories/order-buys.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderBuy,
      OrderBuyRepository,
    ]),
  ],
  controllers: [OrderBuysController],
  providers: [OrderBuysService]
})
export class OrderBuysModule {}
