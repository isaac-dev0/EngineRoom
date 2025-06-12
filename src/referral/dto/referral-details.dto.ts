import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ReferralDetails } from '../model/interfaces/ReferralDetails.interface';
import { Type } from 'class-transformer';
import { ParentDto } from './parent.dto';
import { ChildDto } from './child.dto';

export class ReferralDetailsDto implements ReferralDetails {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one parent is required.' })
  @ValidateNested({ each: true })
  @Type(() => ParentDto)
  parents: Array<ParentDto>;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one child is required.' })
  @ValidateNested({ each: true })
  @Type(() => ChildDto)
  children: Array<ChildDto>;

  @IsNotEmpty()
  @IsString()
  postcode: string;

  @IsNotEmpty()
  @IsString()
  referralReason: string;

  @IsBoolean()
  hasReferredBefore: boolean;
}
