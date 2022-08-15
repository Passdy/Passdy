import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionRepository } from 'src/models/repositories/collections.repository';

@Injectable()
export class CollectionsService {
  constructor(private readonly collectionRepository: CollectionRepository) {}

  create(createCollectionDto: CreateCollectionDto) {
    return this.collectionRepository.save(createCollectionDto);
  }

  findAll() {
    return this.collectionRepository.find();
  }

  findOne(id: number) {
    return this.collectionRepository.findOne(id)
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return this.collectionRepository.update(id, updateCollectionDto);
  }

  remove(id: number) {
    return this.collectionRepository.delete(id);
  }
}
