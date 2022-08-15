import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from 'src/models/entities/shipping.entity';
import { ShippingRepository } from 'src/models/repositories/shipping.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shipping,
      ShippingRepository,
    ]),
  ],
  controllers: [ShippingController],
  providers: [ShippingService]
})
export class ShippingModule {}
