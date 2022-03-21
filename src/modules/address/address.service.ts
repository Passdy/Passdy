import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { Address, AddressType } from 'src/models/entities/address.entity';
import { AddressRepository } from 'src/models/repositories/address.repository';
import {
  CreateAddressDto,
  SearchAddressDto,
} from 'src/modules/address/address.dto';
import { AddressResponseErrorKey } from 'src/modules/address/address.const';
import { UserRepository } from 'src/models/repositories/users.repository';
import { UserRole } from 'src/models/entities/users.entity';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private userRepository: UserRepository,
  ) {}

  async createAddress(
    userId: number,
    addressDto: CreateAddressDto,
  ): Promise<Response<Address>> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user || user.role !== UserRole.Admin) {
      throw new HttpException(
        {
          key: AddressResponseErrorKey.NoPermission,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const existAddress = await this.addressRepository.findAddressByName(
      addressDto.name,
    );
    if (existAddress || !addressDto.name) {
      throw new HttpException(
        {
          key: AddressResponseErrorKey.AddressExist,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (addressDto.parent_id) {
      const parentAddress = await this.addressRepository.findOne({
        id: addressDto.parent_id,
      });
      if (!parentAddress) {
        throw new HttpException(
          {
            key: AddressResponseErrorKey.InvalidParentAddress,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (!Object.values(AddressType).includes(addressDto.address_type)) {
      throw new HttpException(
        {
          key: AddressResponseErrorKey.InvalidAddressType,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newAddress = await this.addressRepository.save(addressDto);
    return {
      data: newAddress,
      metadata: null,
    };
  }

  async getAddress(
    searchAddressDto: SearchAddressDto,
  ): Promise<Response<Address[]>> {
    if (!Object.values(AddressType).includes(searchAddressDto.address_type)) {
      throw new HttpException(
        {
          key: AddressResponseErrorKey.InvalidAddressType,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const addresses = await this.addressRepository.getAddress(searchAddressDto);
    return {
      data: addresses,
      metadata: null,
    };
  }
}
