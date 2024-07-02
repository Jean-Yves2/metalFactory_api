import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/createUserdto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = this.authService.validateUser(email, password);

    const token = this.authService.createToken(await user);

    res.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(await token),
    );

    return res.json({ message: 'Connexion réussie' });
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
