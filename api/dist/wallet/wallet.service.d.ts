import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getBalance(userId: string): Promise<{
        coinBalance: number;
    }>;
    getLedger(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import("@prisma/client").$Enums.LedgerType;
        amountCoins: number;
        usdCents: number;
        refId: string | null;
        metadataJson: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
