import { PrismaService } from '../prisma/prisma.service';
export declare class OffersService {
    private prisma;
    constructor(prisma: PrismaService);
    listActiveOffers(): Promise<{
        device: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        externalOfferId: string;
        title: string;
        description: string | null;
        geo: string | null;
        epcCents: number | null;
        payoutCents: number;
        status: import("@prisma/client").$Enums.OfferStatus;
    }[] | {
        id: string;
        provider: string;
        externalOfferId: string;
        title: string;
        description: string;
        geo: string;
        device: string;
        epcCents: number;
        payoutCents: number;
        status: string;
    }[]>;
    createClick(userId: string, offerId?: string, provider?: string): Promise<{
        clickId: `${string}-${string}-${string}-${string}-${string}`;
        conversionId: string;
    }>;
}
