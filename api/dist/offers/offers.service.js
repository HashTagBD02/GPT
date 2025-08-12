"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let OffersService = class OffersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async createClick(userId, offerId, provider) {
        const clickId = (0, crypto_1.randomUUID)();
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
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OffersService);
//# sourceMappingURL=offers.service.js.map