import { EntityRepository, Repository } from 'typeorm';
import { OrderSort } from 'src/models/entities/order_sorts.entity';

@EntityRepository(OrderSort)
export class OrderSortRepository extends Repository<OrderSort> {
    async getAll(): Promise<any> {
        return this.createQueryBuilder('order_sorts')
    }

    async getOrderById(id: number): Promise<any> {
        return this.findOne(id);
    }
}
