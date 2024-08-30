import { Module } from '@nestjs/common';
import { CommercialService } from './commercial.service';
import { CommercialController } from './commercial.controller';
import { DatabaseModule } from '../database/database.module';
import { RoleGuard } from '../guards/role.guard';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { QuoteService } from '../quote/quote.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    RoleGuard,
    CommercialService,
    PrismaService,
    JwtService,
    QuoteService,
  ],
  controllers: [CommercialController],
})
export class CommercialModule {}
