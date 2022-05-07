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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, Order, OrderRepository]),
    UsersModule
  ],
  providers: [OrderService, MailService],
  controllers: [OrderController],
})
export class OrderModule {}
