import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/entities/users.entity';
import { Order } from 'src/models/entities/orders.entity' 
import { CreateOrderDto } from 'src/modules/order/order.dto';
import { getConfig } from 'src/configs';
import { MAIL } from './mail.const'
import {
  OrderTypeGiveMessage,
  OrderTypeReceiveMessage,
  OrderTypeReceive
} from 'src/models/entities/orders.entity';
import { OrderSort } from 'src/models/entities/order_sorts.entity';
import { OrderReturn } from 'src/models/entities/order_returns.entity';

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

  async sendMailOrder(order: CreateOrderDto): Promise<void> {
    const date = new Date();
    const h = new moment(date).add(7, 'hours').format('h:mm');
    const amPm = new moment(date).add(7, 'hours').format('a');
    const dd = new moment(date).add(7, 'hours').format('DD');
    const mm = new moment(date).add(7, 'hours').format('MM');
    const yyyy = new moment(date).add(7, 'hours').format('YYYY');
    const message = `${h} ${amPm} ngày ${dd} tháng ${mm} năm ${yyyy}`;
    await this.mailerService.sendMail({
      to: order.email,
      subject: MAIL.CREATE_ORDER.SUBJECT,
      template: MAIL.CREATE_ORDER.TEMPLATE,
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

  async sendMailSortOrder(order: Order, sortOrder: OrderSort): Promise<void> {
    const date = new Date(Number(order.created_at))    
    const create_time_string = this.toTimeString(date)

    await this.mailerService.sendMail({
      to: order.email,
      subject: MAIL.SORT_ORDER.SUBJECT,
      template: MAIL.SORT_ORDER.TEMPLATE,
      context: {
        name: order.address_name,
        phone_number: order.phone,
        number_receive: sortOrder.cloth_num_receive,
        number_pass: sortOrder.cloth_num_pass,
        is_return: (OrderTypeReceive.Resend == order.type_receive),
        order_id: sortOrder.order_id,
        number_return : (sortOrder.cloth_num_receive - sortOrder.cloth_num_pass),
        create_time_string: create_time_string
      },
      bcc: process.env.MAIL_BCC
    });
  }

  async sendMailReturnOrder(order: Order, orderReturn: OrderReturn): Promise<void> {
    const date = new Date(Number(order.created_at))    
    const create_time_string = this.toTimeString(date)
    var deliveryTime = new Date(Number(orderReturn.created_at))
    deliveryTime.setDate(deliveryTime.getDate() + 7);
    const deliveryTimeString = this.toTimeString(deliveryTime)

    await this.mailerService.sendMail({
      to: order.email,
      subject: MAIL.RETURN_ORDER.SUBJECT,
      template: MAIL.RETURN_ORDER.TEMPLATE,
      context: {
        name: order.address_name,
        phone_number: order.phone,
        order_id: order.id,
        return_id: orderReturn.id,
        number_return :orderReturn.cloth_num_return,
        create_time_string: create_time_string,
        delivery_time_string: deliveryTimeString,
        delivery_fee: orderReturn.ship_fee,
      },
      bcc: process.env.MAIL_BCC
    });
  }

  toTimeString(date : Date) {
    const h = new moment(date).add(7, 'hours').format('h:mm');
    const amPm = new moment(date).add(7, 'hours').format('a');
    const dd = new moment(date).add(7, 'hours').format('DD');
    const mm = new moment(date).add(7, 'hours').format('MM');
    const yyyy = new moment(date).add(7, 'hours').format('YYYY');
    const time_string = `${h} ${amPm} ngày ${dd} tháng ${mm} năm ${yyyy}`;
    return time_string;
  }
}
