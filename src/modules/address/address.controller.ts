import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AddressService } from 'src/modules/address/address.service';
import { CreateAddressDto, SearchAddressDto } from "src/modules/address/address.dto";
import { Address } from 'src/models/entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createAddress(
    @UserID() userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<Response<Address>> {
    return await this.addressService.createAddress(userId, createAddressDto);
  }

  @Get('')
  async getAddress(
    @Query() search: SearchAddressDto,
  ): Promise<Response<Address[]>> {
    return await this.addressService.getAddress(search);
  }
}
