import { EntityRepository, Repository } from 'typeorm';
import { Coupon } from '../entities/coupon.entity';

@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> {
}
