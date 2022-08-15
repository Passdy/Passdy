import { Module } from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { PatternsController } from './patterns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pattern } from 'src/models/entities/pattern.entity';
import { PatternRepository } from 'src/models/repositories/patterns.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pattern,
      PatternRepository,
    ]),
  ],
  controllers: [PatternsController],
  providers: [PatternsService]
})
export class PatternsModule {}
