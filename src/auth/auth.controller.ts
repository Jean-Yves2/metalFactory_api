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
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/createUserdto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: "Connexion de l'utilisateur et génération de jetons JWT",
  })
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
  @ApiOperation({
    summary: "Vérification de l'authentification de l'utilisateur",
  })
  checkAuth(@Req() req: any) {
    return { isAuthenticated: !!req.user, user: req.user || null };
  }

  @Post('register')
  @ApiOperation({ summary: "Enregistrement d'un nouvel utilisateur" })
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary:
      "Renouvellement du jeton d'accès à partir du jeton de rafraîchissement",
  })
  async refreshToken(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    try {
      const newTokens = await this.authService.refreshTokens(refreshToken);

      res.setHeader('Set-Cookie', [
        this.authService.getCookieWithJwtToken(newTokens.access_token),
      ]);

      return { message: 'Token refreshed successfully' };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  catch() {
    throw new UnauthorizedException('Invalid refresh token');
  }

  @Post('logout')
  @ApiOperation({
    summary: "Déconnexion de l'utilisateur et suppression des cookies",
  })
  logout(@Res() res: ExpressResponse) {
    res.setHeader('Set-Cookie', [
      `access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None`,
      `refresh_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None`,
    ]);

    return res.json({ message: 'Logout successful' });
  }
}
