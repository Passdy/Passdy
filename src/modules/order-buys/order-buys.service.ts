import { Injectable } from '@nestjs/common';
import { CreateOrderBuyDto } from './dto/create-order-buy.dto';
import { UpdateOrderBuyDto } from './dto/update-order-buy.dto';
import { OrderBuyRepository } from 'src/models/repositories/order-buys.repository';

@Injectable()
export class OrderBuysService {
  constructor(private readonly orderBuyRepository: OrderBuyRepository) {}

  create(createOrderBuyDto: CreateOrderBuyDto) {
    return this.orderBuyRepository.save(createOrderBuyDto);
  }

  findAll() {
    return this.orderBuyRepository.find();
  }

  findOne(id: number) {
    return this.orderBuyRepository.findOne(id)
  }

  update(id: number, updateOrderBuyDto: UpdateOrderBuyDto) {
    return this.orderBuyRepository.update(id, updateOrderBuyDto);
  }

  remove(id: number) {
    return this.orderBuyRepository.delete(id);
  }
}
