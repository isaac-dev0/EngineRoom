import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralDetails } from 'src/referral/entity/referral-details.entity';
import { Referral } from 'src/referral/entity/referral.entity';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Comment } from 'src/comment/entity/comment.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.getDatabaseConfig();
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [Referral, Comment, ReferralDetails],
          synchronize: true, // TODO: Disable in PROD!
          logging: ['query', 'error'],
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
