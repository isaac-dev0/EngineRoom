import { PartialType } from '@nestjs/mapped-types';
import { CreateReferralDto } from './create-referral.dto';
import { ReferralStatus } from '../../model/enums/ReferralStatus.enum';
import { IsEnum, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReferralDetailsDto } from '../referral-details.dto';

export class UpdateReferralDto extends PartialType(CreateReferralDto) {
  @IsOptional()
  @IsEnum(ReferralStatus)
  status?: ReferralStatus;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ReferralDetailsDto)
  details?: ReferralDetailsDto;
}
