import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from 'src/models/repositories/images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly imageRepository: ImageRepository) {}

  create(createImageDto: CreateImageDto) {
    return this.imageRepository.save(createImageDto);
  }

  findAll() {
    return this.imageRepository.find();
  }

  findOne(id: number) {
    return this.imageRepository.findOne(id)
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return this.imageRepository.update(id, updateImageDto);
  }

  remove(id: number) {
    return this.imageRepository.delete(id);
  }
}
