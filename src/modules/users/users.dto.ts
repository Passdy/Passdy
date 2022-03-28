import { IsNotEmpty } from 'class-validator';
import { UserStatus } from 'src/models/entities/users.entity';

export class UsersRegisterDto {
  fullname: string;
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  rePassword: string;

  @IsNotEmpty()
  email: string;

  status: UserStatus;
}
