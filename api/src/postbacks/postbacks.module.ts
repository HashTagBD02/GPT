import { Module } from '@nestjs/common';
import { PostbacksController } from './postbacks.controller';
import { PostbacksService } from './postbacks.service';

@Module({
  controllers: [PostbacksController],
  providers: [PostbacksService],
})
export class PostbacksModule {}