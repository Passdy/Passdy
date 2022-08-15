import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { Collection } from 'src/models/entities/collection.entity';
import { CollectionRepository } from 'src/models/repositories/collections.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Collection,
      CollectionRepository,
    ]),
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService]
})
export class CollectionsModule {}
