import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/models/entities/coupon.entity';
import { CouponRepository } from 'src/models/repositories/coupons.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coupon,
      CouponRepository,
    ]),
  ],
  controllers: [CouponsController],
  providers: [CouponsService]
})
export class CouponsModule {}
