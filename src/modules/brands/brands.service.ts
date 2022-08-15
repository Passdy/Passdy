import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandsRepository } from '../../models/repositories/brands.repository'

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  create(createBrandDto: CreateBrandDto) {
    return this.brandsRepository.save(createBrandDto);
  }

  findAll() {
    return this.brandsRepository.find();
  }

  findOne(id: number) {
    return this.brandsRepository.findOne(id)
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandsRepository.update(id, updateBrandDto);
  }

  remove(id: number) {
    return this.brandsRepository.delete(id);
  }
}
