import { Module } from '@nestjs/common';
import { FakerController } from './faker.controller';
import { FakerService } from './faker.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [FakerController],
  providers: [FakerService, PrismaService, UserService], // Add PrismaService to the providers array
})
export class FakerModule {}
