import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(email: string, password: string, displayName: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, hashedPassword, displayName },
    });
    await this.prisma.wallet.create({ data: { userId: user.id } });
    return this.issueToken(user.id, user.email, user.displayName);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.issueToken(user.id, user.email, user.displayName);
  }

  private async issueToken(userId: string, email: string, displayName: string) {
    const accessToken = await this.jwt.signAsync({ sub: userId, email, displayName });
    return { accessToken };
  }
}