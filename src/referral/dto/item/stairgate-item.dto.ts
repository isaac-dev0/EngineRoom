import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { StairgateItem } from '../../model/interfaces/items/StairgateItem.interface';
import { BaseItemDto } from '../base-item.dto';

export class StairgateItemDto extends BaseItemDto implements StairgateItem {
  @IsNotEmpty()
  @IsString()
  item: 'Stairgate';

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  width: number;

  @IsOptional()
  @IsString()
  file?: string;
}
