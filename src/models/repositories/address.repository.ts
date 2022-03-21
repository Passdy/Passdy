import { EntityRepository, Repository } from 'typeorm';
import { Address } from 'src/models/entities/address.entity';
import { SearchAddressDto } from "../../modules/address/address.dto";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async findAddressByName(name: string): Promise<Address> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  async getAddress(search: SearchAddressDto): Promise<Address[]> {
    const condition = {
      address_type: search.address_type,
    };
    if (search.parent_id) condition['parent_id'] = search.parent_id;

    return await this.find({
      where: condition,
    });
  }
}
