import { PayoutsService } from './payouts.service';
import { JwtService } from '@nestjs/jwt';
declare class PayoutDto {
    method: 'PAYPAL' | 'CRYPTO' | 'GIFTCARD';
    amountCoins: number;
}
export declare class PayoutsController {
    private payouts;
    private jwt;
    constructor(payouts: PayoutsService, jwt: JwtService);
    private getUserId;
    request(authHeader: string | undefined, body: PayoutDto): Promise<{
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
export {};
