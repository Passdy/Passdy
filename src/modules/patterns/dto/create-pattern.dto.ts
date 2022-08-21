import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatternDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
