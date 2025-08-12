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
exports.PayoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PayoutsService = class PayoutsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async requestPayout(userId, method, amountCoins) {
        if (amountCoins <= 0)
            throw new common_1.BadRequestException('Invalid amount');
        const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
        if (!wallet || wallet.coinBalance < amountCoins)
            throw new common_1.BadRequestException('Insufficient balance');
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
};
exports.PayoutsService = PayoutsService;
exports.PayoutsService = PayoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayoutsService);
//# sourceMappingURL=payouts.service.js.map