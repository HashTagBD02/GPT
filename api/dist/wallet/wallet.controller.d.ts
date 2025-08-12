import { WalletService } from './wallet.service';
import { JwtService } from '@nestjs/jwt';
export declare class WalletController {
    private wallet;
    private jwt;
    constructor(wallet: WalletService, jwt: JwtService);
    private getUserId;
    balance(authHeader?: string): Promise<{
        coinBalance: number;
    }>;
    ledger(authHeader?: string): Promise<{
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
