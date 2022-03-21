import { IsNotEmpty } from 'class-validator';
import { UserStatus } from 'src/models/entities/users.entity';

export class UsersRegisterDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  rePassword: string;

  @IsNotEmpty()
  email: string;

  status: UserStatus;
}
