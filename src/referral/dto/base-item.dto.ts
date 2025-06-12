import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { BaseItem } from '../model/interfaces/BaseItem.interface';

export class BaseItemDto implements BaseItem {
  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
