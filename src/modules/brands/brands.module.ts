import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { BrandsRepository } from 'src/models/repositories/brands.repository';
import { Brand } from 'src/models/entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      BrandsRepository,
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
