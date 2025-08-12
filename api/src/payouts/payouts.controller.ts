import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { PayoutsService } from './payouts.service';
import { JwtService } from '@nestjs/jwt';
import { IsEnum, IsInt, Min } from 'class-validator';

class PayoutDto {
  @IsEnum(['PAYPAL', 'CRYPTO', 'GIFTCARD'] as const)
  method!: 'PAYPAL' | 'CRYPTO' | 'GIFTCARD';

  @IsInt()
  @Min(1000)
  amountCoins!: number;
}

@Controller('payouts')
export class PayoutsController {
  constructor(private payouts: PayoutsService, private jwt: JwtService) {}

  private async getUserId(authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = authHeader.substring('Bearer '.length);
    const payload = await this.jwt.verifyAsync(token).catch(() => null);
    if (!payload?.sub) throw new UnauthorizedException();
    return payload.sub as string;
  }

  @Post('request')
  async request(@Headers('authorization') authHeader: string | undefined, @Body() body: PayoutDto) {
    const userId = await this.getUserId(authHeader);
    return this.payouts.requestPayout(userId, body.method, body.amountCoins);
  }
}