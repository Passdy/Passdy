import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ColorRepository } from 'src/models/repositories/colors.repository';

@Injectable()
export class ColorsService {
  constructor(private readonly colorRepository: ColorRepository) {}

  create(createColorDto: CreateColorDto) {
    return this.colorRepository.save(createColorDto);
  }

  findAll() {
    return this.colorRepository.find();
  }

  findOne(id: number) {
    return this.colorRepository.findOne(id)
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return this.colorRepository.update(id, updateColorDto);
  }

  remove(id: number) {
    return this.colorRepository.delete(id);
  }
}
