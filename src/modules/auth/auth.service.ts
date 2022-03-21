import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/modules/users/users.service';
import { UserStatus } from 'src/models/entities/users.entity';
import { UserResponseErrorKey } from 'src/modules/users/users.const';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;
    if (user.status === UserStatus.Pending) {
      throw new HttpException(
        { key: UserResponseErrorKey.EmailNotVerified },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.user.email, sub: user.user.id };
    return {
      ...user.user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
