import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { defaultConfig } from 'src/configs/database.config';
import { UsersModule } from 'src/modules/users/users.module';
import { ConsoleModule } from 'nestjs-console';
import { MailModule } from 'src/modules/mail/mail.module';
import { OrderModule } from 'src/modules/order/order.module';
import { EventModule } from 'src/modules/event/event.module';
import { AddressModule } from 'src/modules/address/address.module';
import { GoogleModule} from 'src/modules/google/google.module'
import { OrderSortModule } from './modules/order-sort/order-sort.module';
import { OrderReturnModule } from './modules/order-return/order-return.module';
 
@Module({
  imports: [
    TypeOrmModule.forRoot(defaultConfig),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    ConsoleModule,
    MailModule,
    OrderModule,
    EventModule,
    AddressModule,
    GoogleModule,
    OrderSortModule,
    OrderReturnModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
