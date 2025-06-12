import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { ReferralModule } from './referral/referral.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ReferralModule],
  controllers: [],
  providers: [],
})

export class AppModule {}