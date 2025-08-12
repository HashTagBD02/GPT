import { OffersService } from './offers.service';
import { JwtService } from '@nestjs/jwt';
export declare class OffersController {
    private offers;
    private jwt;
    constructor(offers: OffersService, jwt: JwtService);
    list(): Promise<{
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
    click(authHeader?: string, body?: {
        offerId?: string;
        provider?: string;
    }): Promise<{
        clickId: `${string}-${string}-${string}-${string}-${string}`;
        conversionId: string;
    }>;
}
