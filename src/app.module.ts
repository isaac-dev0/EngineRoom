import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ReferralModule } from './referral/referral.module';
import { ConfigModule } from './core/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ReferralModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
