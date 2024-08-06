import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CartService } from '../cart/cart.service';

@Module({
  providers: [UserService, PrismaService, JwtService, CartService],
  controllers: [UserController],
})
export class UserModule {}
