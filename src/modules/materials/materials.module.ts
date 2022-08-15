import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/models/entities/material.entity';
import { MaterialRepository } from 'src/models/repositories/materials.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Material,
      MaterialRepository,
    ]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService]
})
export class MaterialsModule {}
