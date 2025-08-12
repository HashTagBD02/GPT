import { Body, Controller, Param, Post } from '@nestjs/common';
import { PostbacksService } from './postbacks.service';

@Controller('postbacks')
export class PostbacksController {
  constructor(private service: PostbacksService) {}

  @Post(':provider')
  async handle(@Param('provider') provider: string, @Body() body: any) {
    const payload = {
      click_id: body.click_id ?? body.clickId ?? body.subid ?? body.sub_id,
      tx_id: body.tx_id ?? body.txid ?? body.transaction_id ?? body.event_id ?? `${Date.now()}`,
      payout_cents: body.payout_cents ?? body.payout ?? body.amount_cents ?? (typeof body.amount === 'number' ? Math.round(body.amount * 100) : undefined),
      status: body.status ?? body.event ?? 'credited',
    };
    return this.service.process(provider, payload);
  }
}