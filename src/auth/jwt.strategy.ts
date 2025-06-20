import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/common/rbac/role.enum';
import { SUPABASE_CLIENT } from 'src/core/supabase/supabase.module';

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'supabase-jwt') {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {
    const jwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('SUPABASE_JWT_SECRET is not defined in environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid JWT payload: missing user ID (sub).');
    }

    const { data: userResponse, error } =
      await this.supabaseClient.auth.getUser(payload.sub);

    if (error || !userResponse?.user) {
      throw new UnauthorizedException('User not found or token invalid with Supabase.');
    }

    const user = userResponse.user;

    const role = user.user_metadata?.user.role || Role.REFEREE;

    return { userId: user.id, email: user.email, role: role };
  }
}
