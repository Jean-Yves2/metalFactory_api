import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/createUserdto';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  // Inject the UserService
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profil')
  @ApiOperation({ summary: 'Get My Profil' })
  @ApiResponse({ status: 200, description: 'Get Profil User but no id' })
  async getMyProfil(@Req() req: Request) {
    const userId = req.user?.sub;
    return this.userService.getMyProfile(userId);
  }

  @Get(':id') // GET /user/:id to get user with specific id
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id') // PUT /user/:id to update user with specific id
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.updateUser(id, createUserDto);
  }
  @Delete(':id')
  @Roles(['ADMIN', 'INTERNAL_USER'])
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDelete(id);
  }
  @Get() // GET /user to get all users
  @Roles(['COMMERCIAL', 'ADMIN'])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
