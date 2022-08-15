import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethodRepository } from 'src/models/repositories/payment-methods.repository';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly paymentMethodRepository: PaymentMethodRepository) {}

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodRepository.save(createPaymentMethodDto);
  }

  findAll() {
    return this.paymentMethodRepository.find();
  }

  findOne(id: number) {
    return this.paymentMethodRepository.findOne(id)
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodRepository.update(id, updatePaymentMethodDto);
  }

  remove(id: number) {
    return this.paymentMethodRepository.delete(id);
  }
}
