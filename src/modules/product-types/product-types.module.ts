import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/models/entities/product-type.entity';
import { ProductTypeRepository } from 'src/models/repositories/product-types.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductType,
      ProductTypeRepository,
    ]),
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService]
})
export class ProductTypesModule {}
