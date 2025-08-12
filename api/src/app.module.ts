import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { PostbacksModule } from './postbacks/postbacks.module';
import { WalletModule } from './wallet/wallet.module';
import { PayoutsModule } from './payouts/payouts.module';
import { HomeController } from './home.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    OffersModule,
    PostbacksModule,
    WalletModule,
    PayoutsModule,
  ],
  controllers: [AppController, HomeController],
  providers: [AppService],
})
export class AppModule {}
