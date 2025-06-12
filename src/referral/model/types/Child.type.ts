import { Gender } from '../enums/Gender.enum';
import { Clothing } from './Clothing.type';
import { Item } from './Item.type';

export type Child = {
  forename: string;
  surname: string;
  dateOfBirth: string;
  gender: Gender;
  items: Array<Item>;
  clothing: Array<Clothing>;
  notes?: string;
};
