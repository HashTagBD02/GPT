import { PrismaService } from '../prisma/prisma.service';
export declare class PayoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    requestPayout(userId: string, method: 'PAYPAL' | 'CRYPTO' | 'GIFTCARD', amountCoins: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.PayoutStatus;
        amountCoins: number;
        usdCents: number;
        method: import("@prisma/client").$Enums.PayoutMethod;
        reviewFlags: string | null;
        processorTxnId: string | null;
    }>;
}
