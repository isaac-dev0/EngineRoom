import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get databaseUrl(): string {
    return this.nestConfigService.get('DATABASE_URL');
  }
}
