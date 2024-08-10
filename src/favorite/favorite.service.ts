import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from '@prisma/client';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

}
