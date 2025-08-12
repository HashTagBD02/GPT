import { PrismaService } from '../prisma/prisma.service';
export declare class PostbacksService {
    private prisma;
    constructor(prisma: PrismaService);
    private coinsPerUsdCent;
    process(provider: string, payload: {
        click_id: string;
        tx_id: string;
        payout_cents?: number;
        status?: string;
    }): Promise<{
        ok: boolean;
        ignored: boolean;
    } | {
        ok: boolean;
        ignored?: undefined;
    }>;
}
