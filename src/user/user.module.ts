import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '../guards/role.guard';

@Module({
  providers: [
    UserService,
    PrismaService,
    JwtService,
    RoleGuard,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
