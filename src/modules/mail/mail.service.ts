import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/entities/users.entity';
import { CreateOrderDto } from 'src/modules/order/order.dto';
import { getConfig } from 'src/configs';
import {
  OrderTypeGiveMessage,
  OrderTypeReceiveMessage
} from 'src/models/entities/orders.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

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
        name: user.full_name,
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
        name: user.full_name,
      },
    });
  }

  async sendMailOrder(order: CreateOrderDto, user: User): Promise<void> {
    const date = new Date();
    const h = new moment(date).add(7, 'hours').format('h:mm');
    const amPm = new moment(date).add(7, 'hours').format('a');
    const dd = new moment(date).add(7, 'hours').format('DD');
    const mm = new moment(date).add(7, 'hours').format('MM');
    const yyyy = new moment(date).add(7, 'hours').format('YYYY');
    const message = `${h} ${amPm} ngày ${dd} tháng ${mm} năm ${yyyy}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'TẠO YÊU CẦU LẤY QUẦN ÁO',
      template: '.templates/order',
      context: {
        message: message,
        time: new Date(),
        name: order.address_name,
        phone: order.phone,
        address: order.address,
        cloth_num: order.cloth_num,
        type_give: OrderTypeGiveMessage[order.type_give],
        type_receive: OrderTypeReceiveMessage[order.type_receive]
      },
      bcc: process.env.MAIL_BCC
    });
  }
}
