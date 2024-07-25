import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validatePassword(password: string): Promise<string | null> {
    if (password.length < 12) {
      return 'Le mot de passe doit contenir au moins 12 caractères.';
    }
    if (password.length > 100) {
      return 'Le mot de passe doit contenir au maximum 100 caractères.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une lettre minuscule.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une lettre majuscule.';
    }
    if (!/\d/.test(password)) {
      return 'Le mot de passe doit contenir au moins un chiffre.';
    }
    if (!/[@$!%*?&]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&).';
    }
    return null;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async createToken(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  getCookieWithJwtToken(token: string): string {
    return `access_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`; // 1 day
  }
  getCookieWithJwtRefreshToken(refreshToken: string): string {
    return `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=${
      7 * 24 * 60 * 60
    }`; // 7 days
  }

  async refreshTokens(refreshToken: string) {
    try {
      const { email, sub, role } =
        await this.jwtService.verifyAsync(refreshToken);
      const payload = { email, sub, role };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      });

      return { access_token: accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(createUserDto) {
    const passwordError = await this.validatePassword(createUserDto.password);
    if (passwordError) {
      throw new BadRequestException(passwordError);
    }
    return this.userService.createUser(createUserDto);
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { access_token, refresh_token } = await this.createToken(user);

    return {
      access_token,
      refresh_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        role: user.role,
      },
    };
  }

  async logout(session: any): Promise<{ message: string }> {
    session.destroy();
    return { message: 'Logout successful' };
  }
}
