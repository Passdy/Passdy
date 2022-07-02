import { EntityRepository, Repository } from 'typeorm';
import { Order } from 'src/models/entities/orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async getUserOrder(userId: number): Promise<any> {
        return this.createQueryBuilder('order')
            .where(
                "order.user_id = :userId",
                { userId: userId }
            )
    }
    async getAll(): Promise<any> {
        return this.createQueryBuilder('order')
    }
}
