import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderSort } from 'src/models/entities/order_sorts.entity';
import { OrderSortRepository } from 'src/models/repositories/order_sorts.repository';
import { CreateOrderSort } from './order-sort.dto';

@Injectable()
export class OrderSortService {
    constructor(
        @InjectRepository(OrderSort)
        private orderSortRepository: OrderSortRepository,
    ) { }

    async create(createOrderSort : CreateOrderSort) {
        const newOrderSort = new OrderSort();
        newOrderSort.cloth_num_receive = createOrderSort.num_receive;
        newOrderSort.cloth_num_pass = createOrderSort.num_pass;
        newOrderSort.order_id = createOrderSort.order_id;
        newOrderSort.created_at = new Date().getTime().toString();
        const orderSort = await this.orderSortRepository.save(newOrderSort);
        return orderSort
    }

    async findByOrderId(order_id: number) {
        return this.orderSortRepository.findOne({
            order_id: order_id
        })
    }
}
