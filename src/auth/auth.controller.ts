import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  UseGuards,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/createUserdto';
import { Response as ExpressResponse } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const { access_token, refresh_token, user } = await this.authService.login(
      email,
      password,
    );

    res.setHeader('Set-Cookie', [
      this.authService.getCookieWithJwtToken(access_token),
      this.authService.getCookieWithJwtRefreshToken(refresh_token),
    ]);

    return {
      user,
    };
  }

  @UseGuards(AuthGuard)
  @Get('check-auth')
  checkAuth(@Req() req: any) {
    console.log('Request Headers:', req.headers);
    return { isAuthenticated: !!req.user, user: req.user || null };
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const newTokens = await this.authService.refreshTokens(refreshToken);

    res.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(newTokens.access_token),
    );

    return { message: 'Token refreshed successfully' };
  }
  catch() {
    throw new UnauthorizedException('Invalid refresh token');
  }

  @Post('logout')
  logout(@Res() res: ExpressResponse) {
    res.setHeader('Set-Cookie', [
      `access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None`,
      `refresh_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None`,
    ]);

    return res.json({ message: 'Logout successful' });
  }
}
