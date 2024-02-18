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

@Module({
  imports: [UserModule, OrderModule, ProductModule, AuthModule, AddressModule, UserAddressModule, OrderLineModule, QuoteModule, QuoteLineModule, StockModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
