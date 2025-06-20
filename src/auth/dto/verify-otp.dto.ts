import { IsEmail, IsString, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString({ message: 'Token must be a string.' })
  @MinLength(6, { message: 'Token must be at least 6 characters long' })
  token: string;
}
