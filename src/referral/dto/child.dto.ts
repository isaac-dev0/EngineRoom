import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Child } from '../model/types/Child.type';
import { Gender } from '../model/enums/Gender.enum';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';
import { ClothingDto } from './clothing.dto';

export class ChildDto implements Child {
  @IsNotEmpty()
  @IsString()
  forename: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: Array<ItemDto>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClothingDto)
  clothing: Array<ClothingDto>;

  @IsOptional()
  @IsString()
  notes?: string;
}
