import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'src/models/entities/size.entity';
import { SizeRepository } from 'src/models/repositories/sizes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Size,
      SizeRepository,
    ]),
  ],
  controllers: [SizesController],
  providers: [SizesService]
})
export class SizesModule {}
