import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostbacksService {
  constructor(private prisma: PrismaService) {}

  private coinsPerUsdCent = 10; // 1000 coins per USD

  async process(provider: string, payload: { click_id: string; tx_id: string; payout_cents?: number; status?: string }) {
    const existing = await this.prisma.conversion.findFirst({ where: { clickId: payload.click_id } });
    if (!existing) return { ok: true, ignored: true };

    const payoutCents = Math.max(0, Math.floor(payload.payout_cents ?? existing.payoutCents ?? 0));
    const status = payload.status?.toUpperCase() === 'REVERSED' ? 'REVERSED' : 'CREDITED';

    const coins = payoutCents * this.coinsPerUsdCent;

    await this.prisma.$transaction(async (tx) => {
      await tx.conversion.update({
        where: { id: existing.id },
        data: { txId: payload.tx_id, provider, payoutCents, status },
      });
      if (status === 'CREDITED' && coins > 0) {
        await tx.ledgerEntry.create({
          data: {
            userId: existing.userId,
            type: 'CREDIT',
            amountCoins: coins,
            usdCents: payoutCents,
            refId: existing.id,
          },
        });
        await tx.wallet.update({
          where: { userId: existing.userId },
          data: { coinBalance: { increment: coins } },
        });
      }
      if (status === 'REVERSED' && coins > 0) {
        await tx.ledgerEntry.create({
          data: {
            userId: existing.userId,
            type: 'REVERSAL',
            amountCoins: -coins,
            usdCents: -payoutCents,
            refId: existing.id,
          },
        });
        await tx.wallet.update({
          where: { userId: existing.userId },
          data: { coinBalance: { decrement: coins } },
        });
      }
    });

    return { ok: true };
  }
}