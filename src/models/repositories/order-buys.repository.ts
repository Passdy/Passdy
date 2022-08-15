import { EntityRepository, Repository } from 'typeorm';
import { OrderBuy } from '../entities/order-buy.entity';

@EntityRepository(OrderBuy)
export class OrderBuyRepository extends Repository<OrderBuy> {
}
