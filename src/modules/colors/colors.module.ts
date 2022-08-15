import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { Color } from 'src/models/entities/color.entity';
import { ColorRepository } from 'src/models/repositories/colors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Color,
      ColorRepository,
    ]),
  ],
  controllers: [ColorsController],
  providers: [ColorsService]
})
export class ColorsModule {}
