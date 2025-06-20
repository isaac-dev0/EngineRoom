import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from 'src/core/supabase/supabase.module';
import { AuthDto } from './dto/auth.dto';
import { Role } from 'src/common/rbac/role.enum';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async sendOtp(authDto: AuthDto) {
    const { email } = authDto;
    const { error } = await this.supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:4000',
        shouldCreateUser: true,
        data: {
          role: Role.REFEREE,
        },
      },
    });

    if (error) throw new UnauthorizedException(error.message);
    return {
      message: 'Token has been sent to your email. Please check your inbox.',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, token } = verifyOtpDto;
    const { data, error } = await this.supabaseClient.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) throw new UnauthorizedException(error.message);
    return data;
  }

  async signOut(accessToken: string) {
    this.supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: '',
    });

    const { error } = await this.supabaseClient.auth.signOut();
    if (error) throw new UnauthorizedException(error.message);

    return { message: 'Signed out successfully.' };
  }
}
