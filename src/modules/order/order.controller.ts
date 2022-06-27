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
import { UsersService } from '../users/users.service';
import { UserRole } from '../../models/entities/users.entity'

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly userService: UsersService) { }

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
    const user = (await this.userService.getInfoUserById(userId)).data;
    if (user.role == UserRole.Admin) {
      return await this.orderService.getAllOrder(params);
    }
    return await this.orderService.getUserOrders(userId, params)
  }
}
