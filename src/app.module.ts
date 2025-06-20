import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ReferralModule } from './referral/referral.module';
import { ConfigModule } from './core/config/config.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SupabaseModule } from './core/supabase/supabase.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ReferralModule,
    CommentModule,
    AuthModule,
    UserModule,
    SupabaseModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
