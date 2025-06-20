import { IsEmail, IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;
}
