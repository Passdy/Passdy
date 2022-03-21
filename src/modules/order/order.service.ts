import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/modules/order/order.dto';
import {
  Order,
  OrderTypeGive,
  OrderTypeReceive,
} from 'src/models/entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { OrderRepository } from 'src/models/repositories/orders.repository';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { UserResponseErrorKey } from 'src/modules/users/users.const';
import { OrderResponseErrorKey } from 'src/modules/order/order.const';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(Order)
    private orderRepository: OrderRepository,
    private mailService: MailService,
  ) {}

  async createOrder(
    userId: number,
    createOrderDto: CreateOrderDto,
  ): Promise<Response<Order>> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidUser },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !createOrderDto.type_give ||
      !Object.values(OrderTypeGive).includes(createOrderDto.type_give)
    ) {
      throw new HttpException(
        { key: OrderResponseErrorKey.InvalidTypeGive },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !createOrderDto.type_receive ||
      !Object.values(OrderTypeReceive).includes(createOrderDto.type_receive)
    ) {
      throw new HttpException(
        { key: OrderResponseErrorKey.InvalidTypeReceive },
        HttpStatus.BAD_REQUEST,
      );
    }

    createOrderDto.user_id = userId;
    createOrderDto.created_at = new Date().getTime().toString();
    await this.mailService.sendMailOrder(createOrderDto);
    const order = await this.orderRepository.save(createOrderDto);
    return {
      data: order,
      metadata: null,
    };
  }
}
