import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeRepository } from 'src/models/repositories/product-types.repository';

@Injectable()
export class ProductTypesService {
  constructor(private readonly productTypeRepository: ProductTypeRepository) {}

  create(createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeRepository.save(createProductTypeDto);
  }

  findAll() {
    return this.productTypeRepository.find();
  }

  findOne(id: number) {
    return this.productTypeRepository.findOne(id)
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeRepository.update(id, updateProductTypeDto);
  }

  remove(id: number) {
    return this.productTypeRepository.delete(id);
  }
}
