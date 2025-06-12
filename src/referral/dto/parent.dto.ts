import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Parent } from '../model/types/Parent.type';
import { Gender } from '../model/enums/Gender.enum';
import { Type } from 'class-transformer';
import { ClothingDto } from './clothing.dto';
import { Pack } from '../model/enums/Pack.enum';

export class ParentDto implements Parent {
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
  @Type(() => ClothingDto)
  clothing: Array<ClothingDto>;

  @IsArray()
  @IsEnum(Pack, { each: true })
  packs: Array<Pack>;
}
