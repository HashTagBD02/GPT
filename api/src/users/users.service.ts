import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      countryCode: user.countryCode,
      coinBalance: user.wallet?.coinBalance ?? 0,
      createdAt: user.createdAt,
    };
  }
}