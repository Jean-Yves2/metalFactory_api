import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '../guards/role.guard';
import { Logger} from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    JwtService,
    RoleGuard,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    Logger,
  ],
})
export class UserModule {}
