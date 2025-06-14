import { Module } from '@nestjs/common';
import { ReferralController } from './referral.controller';
import { ReferralService } from './referral.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from './entity/referral.entity';
import { ReferralDetails } from './entity/referral-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Referral, ReferralDetails])],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService],
})

export class ReferralModule {}
