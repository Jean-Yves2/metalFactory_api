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
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/createUserdto';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('user')
export class UserController {
  // Inject the UserService
  constructor(private readonly userService: UserService) {}

  @Get() // GET /user to get all users
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
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
  @UseGuards(RoleGuard)
  @Roles(['ADMIN', 'INTERNAL_USER'])
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDelete(id);
  }
}
