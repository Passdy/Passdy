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
import { ProductsModule } from './modules/products/products.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { SizesModule } from './modules/sizes/sizes.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { PatternsModule } from './modules/patterns/patterns.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ColorsModule } from './modules/colors/colors.module';
import { ImagesModule } from './modules/images/images.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrderBuysModule } from './modules/order-buys/order-buys.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { CouponsModule } from './modules/coupons/coupons.module';
 
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
    OrderReturnModule,
    ProductsModule,
    DepartmentsModule,
    CategoriesModule,
    ProductTypesModule,
    SizesModule,
    MaterialsModule,
    PatternsModule,
    BrandsModule,
    ColorsModule,
    ImagesModule,
    CollectionsModule,
    CartsModule,
    OrderBuysModule,
    PaymentMethodsModule,
    ShippingModule,
    CouponsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
