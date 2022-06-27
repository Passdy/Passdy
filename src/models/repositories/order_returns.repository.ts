import { EntityRepository, Repository } from 'typeorm';
import { OrderReturn } from 'src/models/entities/order_returns.entity';

@EntityRepository(OrderReturn)
export class OrderReturnRepository extends Repository<OrderReturn> {
    async getAll(): Promise<any> {
        return this.createQueryBuilder('order_return')
    }

    async getOrderById(id: number): Promise<any> {
        return this.findOne(id);
    }
}
