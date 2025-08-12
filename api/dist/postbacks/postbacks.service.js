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
exports.PostbacksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostbacksService = class PostbacksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    coinsPerUsdCent = 10;
    async process(provider, payload) {
        const existing = await this.prisma.conversion.findFirst({ where: { clickId: payload.click_id } });
        if (!existing)
            return { ok: true, ignored: true };
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
};
exports.PostbacksService = PostbacksService;
exports.PostbacksService = PostbacksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostbacksService);
//# sourceMappingURL=postbacks.service.js.map