import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  department_id: number;
}
