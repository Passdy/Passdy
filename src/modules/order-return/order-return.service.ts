import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderReturnRepository } from 'src/models/repositories/order_returns.repository';
import { OrderReturn } from 'src/models/entities/order_returns.entity'
import { CreateOrderReturn } from './order-return.dto';

@Injectable()
export class OrderReturnService {
    constructor(
        @InjectRepository(OrderReturn)
        private orderReturnRepository: OrderReturnRepository,
    ) { }

    async create(createOrderReturn: CreateOrderReturn) {
        const newOrderReturn = new OrderReturn();
        newOrderReturn.cloth_num_return = createOrderReturn.num_return;
        newOrderReturn.order_id = createOrderReturn.order_id;
        newOrderReturn.ship_fee = createOrderReturn.ship_fee;
        newOrderReturn.created_at = new Date().getTime().toString();

        const orderSort = await this.orderReturnRepository.save(newOrderReturn);
        return orderSort
    }

    async findByOrderId(order_id: number) {
        return this.orderReturnRepository.findOne({
            order_id: order_id
        })
    }
}
