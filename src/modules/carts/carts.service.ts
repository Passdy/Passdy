import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/models/repositories/carts.repository copy';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly cartRepository: CartRepository) {}

  create(createCartDto: CreateCartDto) {
    return this.cartRepository.save(createCartDto);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOne(id)
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.cartRepository.update(id, updateCartDto);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
