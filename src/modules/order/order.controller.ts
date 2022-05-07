import { Body, Controller, Post, Get, UseGuards, Query } from '@nestjs/common';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { CreateOrderDto } from 'src/modules/order/order.dto';
import { OrderService } from 'src/modules/order/order.service';
import { Order } from 'src/models/entities/orders.entity';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Response<Order>> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrder(
    @UserID() userId: number,
    @Query()
    params: {
      page: number;
      limit: number;
    },
  ): Promise<Pagination<Order>> {
    return await this.orderService.getOrders(userId, params)
  }
}
