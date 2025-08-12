import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersController {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    me(authHeader?: string): Promise<{
        id: string;
        email: string;
        displayName: string;
        countryCode: string | null;
        coinBalance: number;
        createdAt: Date;
    }>;
}
