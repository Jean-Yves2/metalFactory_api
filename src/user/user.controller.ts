import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/createUserdto';

@Controller('user')
export class UserController {
  // Inject the UserService
  constructor(private readonly userService: UserService) {}

  @Get() // GET /user to get all users
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id') // GET /user/:id to get user with specific id
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post() // POST /user to create a new user
  @UsePipes(ValidationPipe)
  async createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Put('/:id') // PUT /user/:id to update user with specific id
  async updateUser(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.updateUser(id, createUserDto);
  }
}
