import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRegisterDto } from 'src/modules/users/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/users.repository';
import {
  TypeConfirm,
  User,
  UserRole,
  UserStatus,
} from 'src/models/entities/users.entity';
import { UserResponseErrorKey } from 'src/modules/users/users.const';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { MailService } from 'src/modules/mail/mail.service';
import { randomString } from 'src/shares/helper';
import { BigNumber } from '@0x/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  validateEmail(email: string): boolean {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }

  async register(usersRegisterDto: UsersRegisterDto): Promise<Response<User>> {
    if (!usersRegisterDto.password) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidPassword },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (usersRegisterDto.password !== usersRegisterDto.rePassword) {
      throw new HttpException(
        { key: UserResponseErrorKey.RePasswordNotMatch },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !usersRegisterDto.email ||
      !this.validateEmail(usersRegisterDto.email)
    ) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidEmail },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existUserEmail = await this.userRepository.getUserByEmail(
      usersRegisterDto.email,
    );

    if (existUserEmail) {
      throw new HttpException(
        { key: UserResponseErrorKey.EmailExist },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User();
    user.full_name = usersRegisterDto.fullname;
    user.password = await bcrypt.hash(
      usersRegisterDto.password,
      Number(process.env.BCRYPT_SALT_OR_ROUND),
    );
    user.email = usersRegisterDto.email;
    user.status = UserStatus.Pending;
    user.type_confirm = TypeConfirm.Email;
    user.confirm_code = randomString();
    await this.mailService.sendUserConfirmation(user, TypeConfirm.Email);
    const newUser = await this.userRepository.save(user);
    newUser.confirm_code = '';
    newUser.password = '';
    return {
      data: newUser,
      metadata: null,
    };
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  async verify(
    type_confirm: string,
    confirm_code: string,
    email: string,
  ): Promise<Response<boolean>> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || user.confirm_code === '') {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidUser },
        HttpStatus.BAD_REQUEST,
      );
    }
    switch (type_confirm) {
      case TypeConfirm.Email:
        if (user.status !== UserStatus.Pending) {
          throw new HttpException(
            { key: UserResponseErrorKey.EmailVerified },
            HttpStatus.BAD_REQUEST,
          );
        }
        if (user.confirm_code !== confirm_code) {
          throw new HttpException(
            { key: UserResponseErrorKey.CodeExpire },
            HttpStatus.BAD_REQUEST,
          );
        }
        user.confirm_code = '';
        user.status = UserStatus.Active;
        await this.userRepository.save(user);
        break;
      default:
        throw new HttpException(
          { key: UserResponseErrorKey.InvalidTypeConfirm },
          HttpStatus.BAD_REQUEST,
        );
    }
    return {
      data: true,
      metadata: null,
    };
  }

  async resetPassword(email: string): Promise<Response<boolean>> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidUser },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.status === UserStatus.Pending) {
      throw new HttpException(
        { key: UserResponseErrorKey.EmailNotVerified },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.type_confirm = TypeConfirm.ResetPass;
    user.confirm_code = randomString(5);
    const expireCode = new Date().getTime() + 3600000;
    user.expire_code = expireCode.toString();
    await this.mailService.sendMailResetPassword(user);
    await this.userRepository.save(user);
    return {
      data: true,
      metadata: null,
    };
  }

  async resetPasswordUser(
    email: string,
    new_password: string,
    confirm_password: string,
    code: string,
  ): Promise<Response<boolean>> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidUser },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.type_confirm !== TypeConfirm.ResetPass) {
      throw new HttpException(
        { key: UserResponseErrorKey.CanNotResetPassword },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      user.confirm_code !== code ||
      user.confirm_code === '' ||
      new BigNumber(user.expire_code).lt(new Date().getTime())
    ) {
      throw new HttpException(
        { key: UserResponseErrorKey.CodeExpire },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (new_password !== confirm_password) {
      throw new HttpException(
        { key: UserResponseErrorKey.RePasswordNotMatch },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await bcrypt.hash(
      new_password,
      Number(process.env.BCRYPT_SALT_OR_ROUND),
    );
    user.confirm_code = '';
    user.expire_code = '';
    await this.userRepository.save(user);
    return {
      data: true,
      metadata: null,
    };
  }

  async getInfoUserById(userId: number): Promise<Response<User>> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidUser },
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = '';
    user.confirm_code = '';
    return {
      data: user,
      metadata: null,
    };
  }

  async updateBalance(
    adminId: number,
    userId: number,
    balance: number,
  ): Promise<Response<User>> {
    if (!balance) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidBalance },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne(userId);
    if (!user || !userId) {
      throw new HttpException(
        { key: UserResponseErrorKey.InvalidUser },
        HttpStatus.BAD_REQUEST,
      );
    }
    const adminUser = await this.userRepository.findOne(adminId);
    if (!adminUser || adminUser.role !== UserRole.Admin) {
      throw new HttpException(
        { key: UserResponseErrorKey.NotPermission },
        HttpStatus.BAD_REQUEST,
      );
    }
    user.balance = balance;
    await this.userRepository.save(user);
    user.password = '';
    user.confirm_code = '';
    return {
      data: user,
      metadata: null,
    };
  }
}
