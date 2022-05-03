import { IsNotEmpty } from 'class-validator';
export class GoogleLoginDto {
  @IsNotEmpty()
  accessToken: string;
}
