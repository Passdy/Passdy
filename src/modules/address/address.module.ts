import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { Address } from 'src/models/entities/address.entity';
import { AddressRepository } from 'src/models/repositories/address.repository';
import { AddressService } from 'src/modules/address/address.service';
import { AddressController } from 'src/modules/address/address.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Address,
      AddressRepository,
    ]),
  ],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
