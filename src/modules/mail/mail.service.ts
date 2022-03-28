import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/entities/users.entity';
import { CreateOrderDto } from 'src/modules/order/order.dto';
import { getConfig } from 'src/configs';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, typeConfirm: string) {
    const baseUrl = getConfig().get<string>('base_url');
    const url = `${baseUrl}/user/verify?type_confirm=${typeConfirm}&confirm_code=${user.confirm_code}&email=${user.email}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'ĐĂNG KÝ THÀNH CÔNG',
      template: '.templates/confirmation',
      context: {
        url,
      },
    });
  }

  async sendMailResetPassword(user: User): Promise<void> {
    const code = user.confirm_code;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'ĐỔI MẬT KHẨU',
      template: '.templates/reset-pass',
      context: {
        code,
      },
    });
  }

  async sendMailOrder(order: CreateOrderDto, user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'TẠO YÊU CẦU LẤY QUẦN ÁO',
      template: '.templates/order',
      context: {
        time: new Date(),
        name: user.full_name,
        phone: order.phone,
        address: order.address,
      },
    });
  }
}
