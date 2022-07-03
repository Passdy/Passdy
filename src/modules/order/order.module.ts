import { Module } from '@nestjs/common';
import { OrderService } from 'src/modules/order/order.service';
import { OrderController } from 'src/modules/order/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { Order } from 'src/models/entities/orders.entity';
import { OrderRepository } from 'src/models/repositories/orders.repository';
import { MailService } from 'src/modules/mail/mail.service';
import { UsersModule } from 'src/modules/users/users.module'
import { UsersService } from '../users/users.service';
import { OrderSortService } from '../order-sort/order-sort.service';
import { OrderReturnService } from '../order-return/order-return.service';
import { OrderSortRepository } from 'src/models/repositories/order_sorts.repository';
import { OrderReturnRepository } from 'src/models/repositories/order_returns.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, Order, OrderRepository, OrderSortRepository, OrderReturnRepository]),
    UsersModule
  ],
  providers: [
    OrderService,
    MailService,
    UsersService, 
    OrderSortService, 
    OrderReturnService
  ],
  controllers: [OrderController],
})
export class OrderModule { }
