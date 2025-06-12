import { BaseItem } from '../BaseItem.interface';

export interface StairgateItem extends BaseItem {
  item: 'Stairgate';
  location: string;
  width: number;
  file?: string;
}
