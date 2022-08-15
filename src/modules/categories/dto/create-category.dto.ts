import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  department_id: number;

}
