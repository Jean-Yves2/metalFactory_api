import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

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
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  getCookieWithJwtToken(token: { access_token: string }): string {
    return `access_token=${token.access_token}; HttpOnly; Path=/; Max-Age=${
      60 * 60 * 24
    }`; // the cookie will be valid for 1 day
  }

  async register(createUserDto) {
    const passwordError = await this.validatePassword(createUserDto.password);
    if (passwordError) {
      throw new BadRequestException(passwordError);
    }
    return this.userService.createUser(createUserDto);
  }

  async logout(session: any): Promise<{ message: string }> {
    session.destroy();
    return { message: 'Logout successful' };
  }
}
