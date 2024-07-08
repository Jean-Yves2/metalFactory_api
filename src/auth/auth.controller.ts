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
import { Response } from 'express';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(email, password);

    res.setHeader('Set-Cookie', [
      this.authService.getCookieWithJwtToken(tokens.access_token),
      this.authService.getCookieWithJwtRefreshToken(tokens.refresh_token),
    ]);

    return { access_token: tokens.access_token };
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newTokens = await this.authService.refreshTokens(refreshToken);

    res.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(newTokens.access_token),
    );

    return { access_token: newTokens.access_token };
  }

  @Post('logout')
  logout(@Res() res: ExpressResponse) {
    res.setHeader('Set-Cookie', [
      `access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `refresh_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ]);

    return res.json({ message: 'Logout successful' });
  }
}
