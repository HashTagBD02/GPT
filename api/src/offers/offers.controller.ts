import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtService } from '@nestjs/jwt';

@Controller('offers')
export class OffersController {
  constructor(private offers: OffersService, private jwt: JwtService) {}

  @Get()
  list() {
    return this.offers.listActiveOffers();
  }

  @Post('click')
  async click(
    @Headers('authorization') authHeader?: string,
    @Body() body?: { offerId?: string; provider?: string },
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = authHeader.substring('Bearer '.length);
    const payload = await this.jwt.verifyAsync(token).catch(() => null);
    if (!payload?.sub) throw new UnauthorizedException();
    return this.offers.createClick(payload.sub as string, body?.offerId, body?.provider);
  }
}