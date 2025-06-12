import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Clothing } from '../model/types/Clothing.type';

export class ClothingDto implements Clothing {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
