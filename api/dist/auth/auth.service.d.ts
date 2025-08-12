import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(email: string, password: string, displayName: string): Promise<{
        accessToken: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    private issueToken;
}
