import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma/prisma.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { UserAddressModule } from './user-address/user-address.module';
import { OrderLineModule } from './order-line/order-line.module';
import { QuoteModule } from './quote/quote.module';
import { QuoteLineModule } from './quote-line/quote-line.module';
import { StockModule } from './stock/stock.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { DiscountModule } from './discount/discount.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierOrderModule } from './supplier-order/supplier-order.module';
import { SupplierOrderLineModule } from './supplier-order-line/supplier-order-line.module';
import { DeliveryCompanyModule } from './delivery-company/delivery-company.module';
import { DeliveryModule } from './delivery/delivery.module';
import { WebAnalyticsModule } from './web-analytics/web-analytics.module';
import { PaymentModule } from './payment/payment.module';
import { OpenRouteModule } from './open-route/open-route.module';
import { FakerModule } from './services/faker/faker.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    OrderModule,
    ProductModule,
    AuthModule,
    AddressModule,
    UserAddressModule,
    OrderLineModule,
    QuoteModule,
    QuoteLineModule,
    StockModule,
    WarehouseModule,
    DiscountModule,
    SupplierModule,
    SupplierOrderModule,
    SupplierOrderLineModule,
    DeliveryCompanyModule,
    DeliveryModule,
    WebAnalyticsModule,
    PaymentModule,
    OpenRouteModule,
    FakerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
