import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReferralDetailsDto } from '../referral-details.dto';

export class CreateReferralDto {
  @IsNotEmpty()
  @IsString()
  refereeId: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ReferralDetailsDto)
  details: ReferralDetailsDto;
}
