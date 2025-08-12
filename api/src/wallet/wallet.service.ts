import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new UnauthorizedException('No wallet');
    return { coinBalance: wallet.coinBalance };
  }

  async getLedger(userId: string) {
    const entries = await this.prisma.ledgerEntry.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 200 });
    return entries;
  }
}