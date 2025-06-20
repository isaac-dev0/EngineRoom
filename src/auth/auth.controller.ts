import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() authDto: AuthDto) {
    return this.authService.sendOtp(authDto);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('signout')
  @UseGuards(AuthGuard('supabase-jwt'))
  @HttpCode(HttpStatus.OK)
  async signOut(@Request() req: any) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken)
      throw new UnauthorizedException('No access token found for sign out.');
    return this.authService.signOut(accessToken);
  }
}
