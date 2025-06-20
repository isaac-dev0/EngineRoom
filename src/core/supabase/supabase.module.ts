import { DynamicModule, Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

@Module({})
export class SupabaseModule {
  static forRoot(): DynamicModule {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is not defined in environment variables. Please check your .env file.',);
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    return {
      module: SupabaseModule,
      providers: [
        {
          provide: SUPABASE_CLIENT,
          useValue: supabaseClient,
        },
      ],
      exports: [SUPABASE_CLIENT],
      global: true
    };
  }
}
