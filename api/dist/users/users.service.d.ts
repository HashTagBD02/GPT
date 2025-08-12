import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        displayName: string;
        countryCode: string | null;
        coinBalance: number;
        createdAt: Date;
    }>;
}
