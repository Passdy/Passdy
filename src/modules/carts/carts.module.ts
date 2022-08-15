import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Cart } from 'src/models/entities/cart.entity';
import { CartRepository } from 'src/models/repositories/carts.repository copy';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      CartRepository,
    ]),
  ],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
