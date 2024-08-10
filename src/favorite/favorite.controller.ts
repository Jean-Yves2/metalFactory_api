import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

}
