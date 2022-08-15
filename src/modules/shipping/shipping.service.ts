import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ShippingRepository } from 'src/models/repositories/shipping.repository';

@Injectable()
export class ShippingService {
  constructor(private readonly shippingRepository: ShippingRepository) {}

  create(createShippingDto: CreateShippingDto) {
    return this.shippingRepository.save(createShippingDto);
  }

  findAll() {
    return this.shippingRepository.find();
  }

  findOne(id: number) {
    return this.shippingRepository.findOne(id)
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingRepository.update(id, updateShippingDto);
  }

  remove(id: number) {
    return this.shippingRepository.delete(id);
  }
}
