import { EntityRepository, Repository } from 'typeorm';
import { Order } from 'src/models/entities/orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
