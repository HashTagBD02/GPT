import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtService } from '@nestjs/jwt';

@Controller('wallet')
export class WalletController {
  constructor(private wallet: WalletService, private jwt: JwtService) {}

  private async getUserId(authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = authHeader.substring('Bearer '.length);
    const payload = await this.jwt.verifyAsync(token).catch(() => null);
    if (!payload?.sub) throw new UnauthorizedException();
    return payload.sub as string;
  }

  @Get('balance')
  async balance(@Headers('authorization') authHeader?: string) {
    const userId = await this.getUserId(authHeader);
    return this.wallet.getBalance(userId);
  }

  @Get('ledger')
  async ledger(@Headers('authorization') authHeader?: string) {
    const userId = await this.getUserId(authHeader);
    return this.wallet.getLedger(userId);
  }
}