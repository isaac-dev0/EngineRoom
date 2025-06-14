import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any };

  constructor() {
    dotenv.config();
    this.envConfig = process.env;
  }

  get(key: string): string | undefined {
    return this.envConfig[key];
  }

  getDatabaseConfig(): {
    host: string;
    port: number;
    username: string;
    password?: string;
    database: string;
  } {
    return {
      host: this.get('DB_HOST') || 'localhost',
      port: parseInt(this.get('DB_PORT') || '5432', 10),
      username: this.get('DB_USERNAME') || 'postgres',
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE') || 'engine_room',
    };
  }
}
