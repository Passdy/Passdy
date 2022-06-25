import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/modules/order/order.dto';
import {
  Order,
  OrderTypeGive,
  OrderTypeReceive,
  OrderStatus
} from 'src/models/entities/orders.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { OrderRepository } from 'src/models/repositories/orders.repository';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { UserResponseErrorKey } from 'src/modules/users/users.const';
import { OrderResponseErrorKey } from 'src/modules/order/order.const';
import { MailService } from 'src/modules/mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(Order)
    private orderRepository: OrderRepository,
    private mailService: MailService,
    private userService: UsersService
  ) { }

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<Response<Order>> {
    var user = await this.userRepository.getUserByEmail(createOrderDto.email)
    if (!user) {
      user = await this.userService.createTempUser(createOrderDto.email, createOrderDto.address_name)
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
    createOrderDto.user_id = user.id;
    createOrderDto.status = OrderStatus.Sort;
    createOrderDto.created_at = new Date().getTime().toString();
    await this.mailService.sendMailOrder(createOrderDto);
    var order = await this.orderRepository.save(createOrderDto);
    delete order.user_id
    return {
      data: order,
      metadata: null,
    };
  }

  async getUserOrders(userId: number, options: IPaginationOptions): Promise<Pagination<Order>> {
    return paginate<Order>(
      await this.orderRepository.getUserOrder(userId),
      options
    );
  }

  async getAllOrder(options: IPaginationOptions): Promise<Pagination<Order>> {
    return paginate<Order>(
      await this.orderRepository.getAll(),
      options
    );
  }
}
