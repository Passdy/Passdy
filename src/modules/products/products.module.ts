import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/entities/product.entity';
import { ProductRepository } from 'src/models/repositories/products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductRepository,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
