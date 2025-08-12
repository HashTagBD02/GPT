import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService, private jwt: JwtService) {}

  @Get('me')
  async me(@Headers('authorization') authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }
    const token = authHeader.substring('Bearer '.length);
    const payload = await this.jwt.verifyAsync(token).catch(() => null);
    if (!payload?.sub) throw new UnauthorizedException('Invalid token');
    return this.users.getProfile(payload.sub as string);
  }
}