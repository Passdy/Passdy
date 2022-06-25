import { Body, Controller, Post, Get, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { CreateOrderDto, OrderDto } from 'src/modules/order/order.dto';
import { OrderService } from 'src/modules/order/order.service';
import { Order } from 'src/models/entities/orders.entity';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiForbiddenResponse} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Response<Order>> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: CreateOrderDto })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrder(
    @UserID() userId: number,
    @Query()
    params: OrderDto,
  ): Promise<Pagination<Order>> {
    return await this.orderService.getOrders(userId, params)
  }
}
