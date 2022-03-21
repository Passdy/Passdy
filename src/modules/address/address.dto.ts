import { IsNotEmpty } from 'class-validator';
import { AddressType } from 'src/models/entities/address.entity';
export class CreateAddressDto {
  @IsNotEmpty()
  address_type: AddressType;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  parent_id: number;
}

export class SearchAddressDto {
  address_type: AddressType;
  parent_id: number;
}
