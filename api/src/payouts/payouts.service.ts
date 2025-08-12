import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayoutsService {
  constructor(private prisma: PrismaService) {}

  async requestPayout(userId: string, method: 'PAYPAL' | 'CRYPTO' | 'GIFTCARD', amountCoins: number) {
    if (amountCoins <= 0) throw new BadRequestException('Invalid amount');
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet || wallet.coinBalance < amountCoins) throw new BadRequestException('Insufficient balance');

    const usdCents = Math.floor(amountCoins / 10);

    return this.prisma.$transaction(async (tx) => {
      const pr = await tx.payoutRequest.create({
        data: { userId, method, amountCoins, usdCents, status: 'PENDING' },
      });
      await tx.wallet.update({ where: { userId }, data: { coinBalance: { decrement: amountCoins } } });
      await tx.ledgerEntry.create({
        data: { userId, type: 'DEBIT', amountCoins: -amountCoins, usdCents: -usdCents, refId: pr.id },
      });
      return pr;
    });
  }
}