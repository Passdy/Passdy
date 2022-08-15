import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeRepository } from 'src/models/repositories/sizes.repository';

@Injectable()
export class SizesService {
  constructor(private readonly sizeRepository: SizeRepository) {}

  create(createSizeDto: CreateSizeDto) {
    return this.sizeRepository.save(createSizeDto);
  }

  findAll() {
    return this.sizeRepository.find();
  }

  findOne(id: number) {
    return this.sizeRepository.findOne(id)
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return this.sizeRepository.update(id, updateSizeDto);
  }

  remove(id: number) {
    return this.sizeRepository.delete(id);
  }
}
