import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/entities/users.entity';
import { CreateOrderDto } from 'src/modules/order/order.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, typeConfirm: string) {
    const url = `${process.env.BASE_URL}/user/verify?type_confirm=${typeConfirm}&confirm_code=${user.confirm_code}&email=${user.email}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your Email',
      template: '.templates/confirmation',
      context: {
        name: user.email,
        url,
      },
    });
  }

  async sendMailResetPassword(user: User): Promise<void> {
    const code = user.confirm_code;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset Your Password',
      template: '.templates/reset-pass',
      context: {
        name: user.email,
        code,
      },
    });
  }

  async sendMailOrder(order: CreateOrderDto): Promise<void> {
    const content = `An order with clean out of ${order.type_give}, dont accept of ${order.type_receive} and address ${order.address} was created`;
    await this.mailerService.sendMail({
      to: 'minhnvgch@gmail.com',
      subject: 'Order Request',
      template: '.templates/order',
      context: {
        name: 'Admin',
        content: content,
      },
    });
  }
}
