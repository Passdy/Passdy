import { EntityRepository, Repository } from 'typeorm';
import { Shipping } from '../entities/shipping.entity';

@EntityRepository(Shipping)
export class ShippingRepository extends Repository<Shipping> {
}
