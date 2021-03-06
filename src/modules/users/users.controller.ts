import { Body, Controller, Get, Post, Query, UseGuards, Redirect } from '@nestjs/common';
import { UsersRegisterDto } from 'src/modules/users/users.dto';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/models/entities/users.entity';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  public async register(
    @Body() usersRegisterDto: UsersRegisterDto,
  ): Promise<Response<User>> {
    return await this.userService.register(usersRegisterDto);
  }

  @Get('verify')
  @Redirect(process.env.FE_BASE_URL+ '/active-success')
  public async verify(
    @Query()
    param: {
      type_confirm: string;
      confirm_code: string;
      email: string;
    },
  ): Promise<Response<boolean>> {
    return await this.userService.verify(
      param.type_confirm,
      param.confirm_code,
      param.email,
    );
  }

  @Get('reset-password')
  public async resetPassword(
    @Query() param: { email: string },
  ): Promise<Response<boolean>> {
    return await this.userService.resetPassword(param.email);
  }

  @Post('reset-password')
  public async resetPass(
    @Body()
    body: {
      email: string;
      new_password: string;
      confirm_password: string;
      code: string;
    },
  ): Promise<Response<boolean>> {
    return await this.userService.resetPasswordUser(
      body.email,
      body.new_password,
      body.confirm_password,
      body.code,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserInfo(@UserID() userId: number): Promise<Response<User>> {
    return await this.userService.getInfoUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-balance')
  async updateBalance(
    @UserID() userId: number,
    @Body() body: { user_id: number; balance: number },
  ): Promise<Response<User>> {
    return await this.userService.updateBalance(
      userId,
      body.user_id,
      body.balance,
    );
  }

  @Get('list-group')
  @UseGuards(JwtAuthGuard)
  async listGroup(@UserID() userId: number): Promise<Response<any>> {
    await this.userService.isAdmin(userId);
    return await this.userService.getListRole();
  }

  @Get('user-list')
  @UseGuards(JwtAuthGuard)
  async getUser(
    @UserID() userId: number,
    @Query()
    params: {
      full_name: string;
      phone_number: string;
      email: string;
      group_id: string;
    },
  ): Promise<Response<any>> {
    await this.userService.isAdmin(userId);
    return await this.userService.getListUser(
      params.full_name,
      params.phone_number,
      params.email,
      params.group_id,
    );
  }

  @Get('modify-user')
  @UseGuards(JwtAuthGuard)
  async modifyUser(
    @UserID() userId: number,
    @Query() param: { modifyType: string; idUser: number },
  ): Promise<Response<boolean>> {
    await this.userService.isAdmin(userId);
    return await this.userService.modifyUser(param.modifyType, param.idUser);
  }
}
