import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async listActiveOffers() {
    const offers = await this.prisma.offer.findMany({ where: { status: 'ACTIVE' }, take: 100, orderBy: { createdAt: 'desc' } });
    if (offers.length === 0) {
      return [
        { id: 'sample-1', provider: 'SAMPLE', externalOfferId: '1', title: 'Try a sample app', description: 'Install and open the app', geo: 'US,CA', device: 'android', epcCents: 50, payoutCents: 200, status: 'ACTIVE' },
        { id: 'sample-2', provider: 'SAMPLE', externalOfferId: '2', title: 'Complete a survey', description: '10 min survey', geo: 'US', device: 'desktop', epcCents: 30, payoutCents: 100, status: 'ACTIVE' },
      ];
    }
    return offers;
  }

  async createClick(userId: string, offerId?: string, provider?: string) {
    const clickId = randomUUID();
    const conversion = await this.prisma.conversion.create({
      data: {
        userId,
        offerId: offerId ?? null,
        provider: provider ?? 'SAMPLE',
        clickId,
        status: 'PENDING',
        payoutCents: 0,
        txId: `pending:${clickId}`,
        idempotencyKey: `click:${clickId}`,
      },
    });
    return { clickId, conversionId: conversion.id };
  }
}